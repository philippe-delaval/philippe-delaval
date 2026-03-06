import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const port = 4173;
const host = "127.0.0.1";
const previewUrl = `http://${host}:${port}/?capture=1`;
const shouldBuild = process.argv.includes("--build");
const githubProfileReadmeWidth = 894;
const captureViewportWidth = githubProfileReadmeWidth;
const captureDeviceScaleFactor = 2;
const disableSandbox = process.env.PUPPETEER_DISABLE_SANDBOX === "1";

function runCommand(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(npmCommand, args, {
      stdio: "inherit",
      shell: false,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${npmCommand} ${args.join(" ")} exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureBuild() {
  if (shouldBuild || !(await fileExists("dist/index.html"))) {
    await runCommand(["run", "build"]);
  }
}

async function resolveChromeExecutable() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      return candidate;
    }
  }

  try {
    return puppeteer.executablePath();
  } catch {
    throw new Error(
      "No Chrome or Chromium executable found. Set PUPPETEER_EXECUTABLE_PATH to a local browser binary."
    );
  }
}

async function waitForServer(url, serverProcess, retries = 50) {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    if (serverProcess.exitCode !== null) {
      throw new Error("The preview server exited before becoming available.");
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await delay(250);
  }

  throw new Error(`Preview server did not start at ${url}`);
}

async function main() {
  await ensureBuild();

  const executablePath = await resolveChromeExecutable();
  const serverProcess = spawn(
    npmCommand,
    ["run", "preview", "--", "--host", host, "--port", String(port), "--strictPort"],
    {
      stdio: "ignore",
      shell: false,
    }
  );

  let browser;

  try {
    await waitForServer(previewUrl, serverProcess);

    // Sandbox stays enabled by default and can be explicitly disabled only when required.
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: disableSandbox ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: captureViewportWidth,
      height: 1200,
      deviceScaleFactor: captureDeviceScaleFactor,
    });
    await page.goto(previewUrl, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: "preview.png",
      type: "png",
      fullPage: true,
    });
  } finally {
    if (browser) {
      await browser.close();
    }

    if (serverProcess.exitCode === null) {
      serverProcess.kill("SIGTERM");
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
