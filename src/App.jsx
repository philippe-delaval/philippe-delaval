import React from "react";
import { Activity, Code, Cpu, Database, Layers, Server, Terminal } from "lucide-react";

// ---------------------------------------------------------------------------
// Static content
// Keep all editable text and card data near the top of the file so content
// changes do not require digging through the JSX structure below.
// ---------------------------------------------------------------------------

const heroContent = {
  title: "Hi, I'm Philippe",
  subtitle: "Design > Development > DevOps...",
};

const pipelineLabels = [
  { label: "Graphic Design", toneClass: "pipeline__label--purple" },
  { label: "Web Developer", toneClass: "pipeline__label--blue" },
  { label: "DevOps Engineer", toneClass: "pipeline__label--cyan" },
];

const stackCards = [
  {
    title: "Frontend_Core",
    icon: Code,
    items: [
      ["Vue.js", "green"],
      ["React", "blue"],
      ["Next.js", "blue"],
      ["TypeScript", "blue"],
      ["Tailwind", "cyan"],
    ],
  },
  {
    title: "Backend & Storage",
    icon: Database,
    items: [
      ["Node.js", "green"],
      ["Laravel", "red"],
      ["PostgreSQL", "blue"],
      ["Neon", "cyan"],
    ],
  },
  {
    title: "Infrastructure",
    icon: Layers,
    items: [
      ["Docker", "yellow"],
      ["GH Actions", "blue"],
      ["Cloudflare", "orange"],
      ["Proxmox", "slate"],
    ],
  },
  {
    title: "Currently_Building",
    icon: Cpu,
    featured: true,
    items: [
      ["Kubernetes", "cyan"],
      ["Terraform", "purple"],
      ["Go", "blue"],
      ["AWS/Azure", "yellow"],
    ],
  },
];

const homelabMetrics = [
  ["Orchestrator", "Docker/Portainer"],
  ["Hypervisor", "Proxmox VE", "metric-row__value--orange"],
  ["Nodes", "Rpi3b + MiniPC"],
];

const philosophyQuote =
  '"Design taught me user experience. Development taught me logic. DevOps is teaching me resilience."';

// ---------------------------------------------------------------------------
// Visual helpers
// This map centralizes badge color classes so each stack item only needs a
// semantic color name such as "blue" or "cyan".
// ---------------------------------------------------------------------------

const badgeTones = {
  blue: {
    badgeClass: "badge--blue",
    dotClass: "badge__dot--blue",
  },
  cyan: {
    badgeClass: "badge--cyan",
    dotClass: "badge__dot--cyan",
  },
  green: {
    badgeClass: "badge--green",
    dotClass: "badge__dot--green",
  },
  orange: {
    badgeClass: "badge--orange",
    dotClass: "badge__dot--orange",
  },
  purple: {
    badgeClass: "badge--purple",
    dotClass: "badge__dot--purple",
  },
  red: {
    badgeClass: "badge--red",
    dotClass: "badge__dot--red",
  },
  slate: {
    badgeClass: "badge--slate",
    dotClass: "badge__dot--slate",
  },
  yellow: {
    badgeClass: "badge--yellow",
    dotClass: "badge__dot--yellow",
  },
};

// Reusable tech badge used in the stack grid cards.
function Badge({ children, color = "blue" }) {
  const tone = badgeTones[color] ?? badgeTones.blue;

  return (
    <span className={`badge ${tone.badgeClass}`}>
      <span className={`badge__dot ${tone.dotClass}`} />
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main sections
// Each section below matches one visible block in the screenshot layout.
// Keeping them grouped in one file makes the project simpler to edit.
// ---------------------------------------------------------------------------

// Top terminal-like introduction block.
function TerminalHero() {
  return (
    <header className="terminal-card">
      <div className="terminal-card__bar">
        <div className="terminal-card__lights">
          <span className="terminal-card__light terminal-card__light--red" />
          <span className="terminal-card__light terminal-card__light--yellow" />
          <span className="terminal-card__light terminal-card__light--green" />
        </div>
        <div className="terminal-card__path">
          <Terminal size={14} />
          <span>philippe-delaval / README.md</span>
        </div>
      </div>

      <div className="terminal-card__body">
        <h1 className="terminal-card__title">{heroContent.title}</h1>
        <div className="terminal-card__line">{heroContent.subtitle}</div>
        <p className="terminal-card__copy">
          A former <span className="accent accent--purple">Graphic Designer</span>{" "}
          turned <span className="accent accent--blue">Web Developer</span>, now
          transitioning into <span className="accent accent--cyan">DevOps</span>. I
          build web applications, APIs, and manage my self-hosted infrastructure in
          my homelab.
        </p>
      </div>
    </header>
  );
}

// Career transition progress card.
function PipelineSection() {
  return (
    <section className="panel">
      <div className="panel__header">
        <h2 className="panel__title">
          <Activity size={16} className="text-green" />
          <span>DEPLOYMENT_PIPELINE: ACTIVE</span>
        </h2>
        <span className="panel__meta">PIPELINE_STAGES: 3/3</span>
      </div>

      <div className="pipeline">
        <div className="pipeline__labels">
          {pipelineLabels.map(({ label, toneClass }) => (
            <span key={label} className={`pipeline__label ${toneClass}`}>
              {label}
            </span>
          ))}
        </div>

        <div className="pipeline__track">
          <span className="pipeline__segment pipeline__segment--purple" />
          <span className="pipeline__segment pipeline__segment--blue" />
          <span className="pipeline__segment pipeline__segment--cyan is-active" />
          <span className="pipeline__segment pipeline__segment--empty" />
        </div>

        <div className="pipeline__status">
          <span>Legacy System</span>
          <span>Runtime Stable</span>
          <span className="pipeline__status-live">Deploying...</span>
        </div>
      </div>
    </section>
  );
}

// Technology grid displayed in the main column.
function StackSection() {
  return (
    <section className="stack-grid">
      {stackCards.map(({ title, icon: Icon, items, featured = false }) => (
        <article key={title} className={`panel stack-card${featured ? " stack-card--featured" : ""}`}>
          <h3 className={`stack-card__title${featured ? " is-featured" : ""}`}>
            <Icon size={14} />
            <span>{title}</span>
          </h3>

          <div className="stack-card__badges">
            {items.map(([label, color]) => (
              <Badge key={label} color={color}>
                {label}
              </Badge>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

// Infrastructure summary card in the sidebar.
function HomelabSection() {
  return (
    <section className="panel">
      <h3 className="stack-card__title">
        <Server size={14} />
        <span>Homelab_Metrics</span>
      </h3>

      <div className="metric-list">
        {homelabMetrics.map(([label, value, valueClass]) => (
          <div key={label} className="metric-row">
            <span className="metric-row__label">{label}</span>
            <span className={`metric-row__value${valueClass ? ` ${valueClass}` : ""}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="health-block">
        <div className="health-block__title">
          <span className="health-block__dot is-live" />
          <span>SYSTEMS_HEALTHY</span>
        </div>
        <p className="health-block__copy">
          Experimenting with Infrastructure as Code and self-hosting for real-world
          reliability tests.
        </p>
      </div>
    </section>
  );
}

// Short quote card used to close the sidebar.
function PhilosophySection() {
  return (
    <section className="philosophy-card">
      <h3 className="philosophy-card__title">Philosophy</h3>
      <p className="philosophy-card__copy">{philosophyQuote}</p>
    </section>
  );
}

// Signature line at the bottom of the layout.
function ProfileFooter() {
  return (
    <footer className="profile-footer">
      End of Transmission // {new Date().getFullYear()} // Philippe Delaval
    </footer>
  );
}

// ---------------------------------------------------------------------------
// App layout
// This is the final page composition used both in the browser and for the
// generated README screenshot.
// ---------------------------------------------------------------------------

function App() {
  return (
    <div className="profile-app capture-mode">
      <div className="profile-shell">
        <TerminalHero />

        <div className="dashboard-grid">
          <main className="dashboard-main">
            <PipelineSection />
            <StackSection />
          </main>

          <aside className="dashboard-sidebar">
            <HomelabSection />
            <PhilosophySection />
          </aside>
        </div>

        <ProfileFooter />
      </div>
    </div>
  );
}

export default App;
