import React, { useState, useEffect } from 'react'; import { Terminal, Server, Cpu, Globe, Database, Code, Activity, Layers, ExternalLink, ChevronRight, Layout } from 'lucide-react'; const App = () => { const \[typedText, setTypedText\] = useState(''); const fullText = "Design > Development > DevOps..."; const \[pulse, setPulse\] = useState(true); useEffect(() => { let i = 0; const interval = setInterval(() => { setTypedText(fullText.slice(0, i)); i++; if (i > fullText.length) clearInterval(interval); }, 50) ; const pulseInterval = setInterval(() => setPulse(p => !p), 2000); return () => { clearInterval(interval); clearInterval(pulseInterval); }; }, \[\]); const Badge = ({ children, color = "blue" }) => (

{children} ); return (

{/\* Header / Terminal \*/}

philippe-delaval / README.md

Hi, I'm Philippe 👋
===================

{typedText}\_

A former Graphic Designer turned Web Developer, now transitioning into DevOps. I build web applications, APIs, and manage my self-hosted infrastructure in my homelab.

{/\* Main Status Column \*/}

{/\* Transition Progress (3 steps) \*/}

### DEPLOYMENT\_PIPELINE: ACTIVE

PIPELINE\_STAGES: 3/3

Graphic Design

Web Developer

DevOps Engineer

{/\* Step 1: Design - Completed \*/}

{/\* Step 2: Web Dev - Completed/Foundation \*/}

{/\* Step 3: DevOps - In Progress \*/}

Legacy System Runtime Stable Deploying...

{/\* Tech Stack Grid \*/}

#### `Frontend_Core`

`   Vue.js React Next.js TypeScript Tailwind   `

`   #### Backend & Storage  Node.js Laravel PostgreSQL Neon  #### Infrastructure  Docker GH Actions Cloudflare Proxmox  #### Currently_Building  Kubernetes Terraform Go AWS/Azure     `

`{/* Sidebar Status */}  ### Homelab_Metrics  Orchestrator Docker / Swarm  Hypervisor Proxmox VE  Nodes Rpi4 + MiniPC  SYSTEMS_HEALTHY  Experimenting with Infrastructure as Code and self-hosting for real-world reliability tests.  ### Philosophy  "Design taught me user experience. Development taught me logic. DevOps is teaching me resilience."      `

`   End of Transmission // {new Date().getFullYear()} // Philippe Delaval   `

`); }; export default App;`
