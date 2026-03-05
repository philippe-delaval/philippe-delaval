import React, { useState, useEffect } from 'react';
import { Terminal, Server, Cpu, Globe, Database, Code, Activity, Layers, ExternalLink, ChevronRight, Layout } from 'lucide-react';

const App = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Design > Development > DevOps...";
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50) ;
    
    const pulseInterval = setInterval(() => setPulse(p => !p), 2000);
    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  const Badge = ({ children, color = "blue" }) => (
    <span className={`px-2 py-1 rounded text-xs font-mono border border-${color}-500/30 bg-${color}-500/10 text-${color}-400 flex items-center gap-1`}>
      <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 ${pulse ? 'animate-pulse' : ''}`} />
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-300 p-4 md:p-8 font-mono">
      {/* Header / Terminal */}
      <div className="max-w-5xl mx-auto mb-8 border border-slate-700 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#161b22] px-4 py-2 border-b border-slate-700 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-xs text-slate-500 ml-4 flex items-center gap-2">
            <Terminal size={14} /> philippe-delaval / README.md
          </div>
        </div>
        <div className="p-6 bg-[#0d1117]">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hi, I'm Philippe <span className="animate-wave inline-block">👋</span>
          </h1>
          <div className="text-cyan-400 h-6">
            {typedText}<span className="animate-pulse">_</span>
          </div>
          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm md:text-base">
            A former <span className="text-purple-400">Graphic Designer</span> turned <span className="text-blue-400">Web Developer</span>, now transitioning into <span className="text-cyan-400">DevOps</span>. 
            I build web applications, APIs, and manage my self-hosted infrastructure in my homelab.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Status Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Transition Progress (3 steps) */}
          <div className="bg-[#161b22] border border-slate-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Activity size={16} className="text-green-500" /> DEPLOYMENT_PIPELINE: ACTIVE
              </h3>
              <span className="text-[10px] text-slate-500 font-mono italic">PIPELINE_STAGES: 3/3</span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-3 items-center justify-between text-[10px] uppercase tracking-tighter">
                <div className="text-purple-400 font-bold">Graphic Design</div>
                <div className="text-blue-400 font-bold text-center">Web Developer</div>
                <div className="text-cyan-400 font-bold text-right">DevOps Engineer</div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-slate-800 border border-slate-700">
                {/* Step 1: Design - Completed */}
                <div style={{ width: "33%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 border-r border-slate-900/50"></div>
                {/* Step 2: Web Dev - Completed/Foundation */}
                <div style={{ width: "33%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 border-r border-slate-900/50"></div>
                {/* Step 3: DevOps - In Progress */}
                <div style={{ width: "20%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 animate-pulse"></div>
                <div style={{ width: "14%" }} className="bg-slate-700/30"></div>
              </div>
              <div className="text-[10px] text-slate-500 flex justify-between">
                <span>Legacy System</span>
                <span>Runtime Stable</span>
                <span className="text-cyan-500 animate-pulse">Deploying...</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#161b22] border border-slate-700 rounded-lg p-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Code size={14} /> Frontend_Core
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge color="green">Vue.js</Badge>
                <Badge color="blue">React</Badge>
                <Badge color="blue">Next.js</Badge>
                <Badge color="blue">TypeScript</Badge>
                <Badge color="cyan">Tailwind</Badge>
              </div>
            </div>
            
            <div className="bg-[#161b22] border border-slate-700 rounded-lg p-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Database size={14} /> Backend & Storage
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge color="green">Node.js</Badge>
                <Badge color="red">Laravel</Badge>
                <Badge color="blue">PostgreSQL</Badge>
                <Badge color="cyan">Neon</Badge>
              </div>
            </div>

            <div className="bg-[#161b22] border border-slate-700 rounded-lg p-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Layers size={14} /> Infrastructure
              </h4>
              <div className="flex flex-wrap gap-2 text-yellow-500">
                <Badge color="yellow">Docker</Badge>
                <Badge color="blue">GH Actions</Badge>
                <Badge color="orange">Cloudflare</Badge>
                <Badge color="slate">Proxmox</Badge>
              </div>
            </div>

            <div className="bg-[#161b22] border border-slate-700 rounded-lg p-4 border-dashed border-cyan-500/30">
              <h4 className="text-xs font-bold text-cyan-500 uppercase mb-3 flex items-center gap-2">
                <Cpu size={14} /> Currently_Building
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge color="cyan">Kubernetes</Badge>
                <Badge color="purple">Terraform</Badge>
                <Badge color="blue">Go</Badge>
                <Badge color="yellow">AWS/Azure</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="bg-[#161b22] border border-slate-700 rounded-lg p-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
              <Server size={14} /> Homelab_Metrics
            </h3>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Orchestrator</span>
                <span className="text-white">Docker / Swarm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Hypervisor</span>
                <span className="text-orange-400">Proxmox VE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Nodes</span>
                <span className="text-white">Rpi4 + MiniPC</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex gap-1 items-center mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] text-green-500">SYSTEMS_HEALTHY</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Experimenting with Infrastructure as Code and self-hosting for real-world reliability tests.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-slate-700 rounded-lg p-5">
             <h3 className="text-xs font-bold text-white uppercase mb-2">Philosophy</h3>
             <p className="text-xs leading-relaxed text-slate-400 italic">
               "Design taught me user experience. Development taught me logic. DevOps is teaching me resilience."
             </p>
          </div>
        </div>

      </div>
      
      <div className="max-w-5xl mx-auto mt-12 text-center text-[10px] text-slate-600 uppercase tracking-widest">
        End of Transmission // {new Date().getFullYear()} // Philippe Delaval
      </div>
    </div>
  );
};

export default App;
