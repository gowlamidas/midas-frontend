import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Layers,
  Gamepad2,
  Cpu,
  Globe,
  ArrowRight,
  Terminal,
  Database,
  LayoutTemplate,
  Disc,
  ShieldCheck,
  Zap,
  Box,
  Monitor
} from 'lucide-react';

// --- CONFIGURACIÓN DE ESTILOS Y COMPONENTES UI ---

const ArchitecturalBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-slate-950">
    {/* Grid Principal */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

    {/* Círculos de Datos (Decorativo) */}
    <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle cx="50%" cy="50%" r="25%" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
    </svg>

    {/* Scanlines Sutiles */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none" />
  </div>
);

const SectionHeader = ({ title, subtitle, align = "left" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    <div className={`flex items-center gap-3 mb-2 ${align === "center" ? "justify-center" : "justify-start"}`}>
      <div className="w-2 h-2 bg-amber-500 rounded-sm animate-pulse" />
      <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">
        {subtitle}
      </span>
    </div>
    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
      {title}
    </h2>
    <div className={`h-px w-24 bg-gradient-to-r from-amber-500 to-transparent mt-4 ${align === "center" ? "mx-auto" : ""}`} />
  </div>
);

const TechCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="relative group p-8 border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-amber-500/50 transition-all duration-500 overflow-hidden flex flex-col h-full"
  >
    {/* Hover Gradient */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="flex items-center gap-4 mb-6 relative z-10">
      <div className="p-3 bg-slate-800/80 rounded-sm text-amber-400 group-hover:text-amber-300 transition-colors border border-slate-700 group-hover:border-amber-500/30 shadow-lg shadow-black/50">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-slate-100 tracking-wide font-mono">{title}</h3>
    </div>

    <p className="text-slate-400 text-sm leading-relaxed font-light relative z-10 flex-grow">
      {desc}
    </p>

    {/* HUD Elements Corners */}
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-600 group-hover:border-amber-500 transition-colors duration-300" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-600 group-hover:border-amber-500 transition-colors duration-300" />
  </motion.div>
);

const PrimaryButton = ({ children, href, icon: Icon, variant = "primary" }) => {
  const isPrimary = variant === "primary";
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center gap-3 px-8 py-4 font-bold tracking-widest text-xs uppercase border-r-4 border-b-4 transition-all group relative overflow-hidden
        ${isPrimary
          ? 'bg-amber-500 text-slate-950 border-amber-700 hover:bg-amber-400 hover:border-amber-600'
          : 'bg-transparent text-slate-300 border-slate-700 hover:border-amber-500 hover:text-amber-400 bg-slate-900/50'
        }
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon size={14} />}
      </span>
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
    </motion.a>
  );
};

// --- SECCIONES ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="font-bold text-lg tracking-widest text-white flex items-center gap-3 font-mono">
        <div className="w-3 h-3 bg-amber-500 rotate-45 border border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
        MIDAS_NETWORK
      </div>
      <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest text-slate-400 uppercase">
        {['Servicios', 'Filosofía', 'Gaming', 'Discord'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-400 transition-colors relative group">
            <span className="group-hover:opacity-100 opacity-0 absolute -left-3 text-amber-500 transition-opacity">/</span>
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        SYSTEMS ONLINE
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <span className="px-4 py-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-mono tracking-[0.3em] uppercase backdrop-blur-md">
        Midas Architecture v.2.0.4
      </span>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
    >
      ARQUITECTURA <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600 drop-shadow-2xl">
        MODULAR
      </span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="max-w-3xl text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-light"
    >
      <p>
        Desarrollo Web <span className="text-slate-200 font-medium">Full Stack</span>. Conexión real entre lógica de negocios y experiencia UX/UI.
        Especialistas en arquitecturas de monolitos modulares, Python, Node.js y React.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
    >
      <PrimaryButton href="#contact" icon={ArrowRight}>Iniciar Proyecto</PrimaryButton>
      <PrimaryButton href="#gaming" variant="secondary" icon={Gamepad2}>División Gaming</PrimaryButton>
    </motion.div>

    {/* Footer de Hero - Scroll Hint */}
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 opacity-50"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <span className="text-[10px] uppercase tracking-widest font-mono">Scroll Down</span>
      <div className="w-px h-12 bg-gradient-to-b from-slate-600 to-transparent" />
    </motion.div>
  </section>
);

const Services = () => {
  const services = [
    {
      title: "Monolitos Modulares",
      desc: "Arquitectura de software que equilibra la simplicidad con la escalabilidad. Evitamos la sobre-ingeniería de microservicios hasta que es estrictamente necesaria.",
      icon: Box
    },
    {
      title: "Backend Engineering",
      desc: "Lógica robusta en Python y Node.js. Diseño de APIs RESTful y GraphQL optimizadas para alto tráfico y procesamiento de datos seguro.",
      icon: Server
    },
    {
      title: "Frontend React & Vite",
      desc: "Interfaces ultra rápidas construidas con el ecosistema moderno. Implementación de estados complejos y animaciones fluidas con Framer Motion.",
      icon: LayoutTemplate
    },
    {
      title: "UX/UI Personalizada",
      desc: "No usamos plantillas genéricas. Cada píxel está diseñado en Figma y programado para conectar con la psicología de tu usuario final.",
      icon: Monitor
    }
  ];

  return (
    <section className="relative z-10 py-32 px-6 bg-slate-950" id="servicios">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="CAPACIDADES TÉCNICAS" subtitle="Core Systems" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <TechCard key={i} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section className="relative z-10 py-24 px-6 border-y border-slate-900 bg-slate-900/20">
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-6 inline-flex items-center justify-center p-3 bg-slate-800 rounded-full border border-slate-700">
        <Cpu className="text-amber-500" size={32} />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
        "MIENTRAS JUGAMOS, <br className="hidden md:block"/>
        <span className="text-slate-500">TAMBIÉN CREAMOS."</span>
      </h2>
      <p className="text-slate-400 text-lg leading-relaxed">
        Creemos que la curiosidad lúdica es el motor de la innovación seria.
        Nuestros servidores de juego no son solo entretenimiento; son
        <span className="text-amber-400 font-medium"> entornos de prueba de alta latencia</span> donde perfeccionamos nuestra capacidad para manejar comunidades, bases de datos en tiempo real y optimización de recursos.
      </p>
    </div>
  </section>
);

const GamingDivision = () => (
  <section className="relative z-10 py-32 px-6 overflow-hidden bg-slate-950" id="gaming">
    {/* Fondo decorativo lateral */}
    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-900/5 to-transparent pointer-events-none" />

    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

      {/* Columna Texto */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6 text-amber-500">
          <Terminal size={20} />
          <span className="font-mono text-xs tracking-[0.2em] font-bold uppercase">Midas_Labs :: GTA V Roleplay</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          MIDAS ROLEPLAY <br/> SERVER
        </h2>

        <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light border-l-2 border-amber-500/50 pl-6">
          Un ecosistema digital vivo. Implementamos scripts Lua optimizados, interfaces NUI reactivas (React dentro del juego) y sistemas de economía balanceados.
        </p>

        <div className="space-y-6 mb-10">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center border border-slate-700 text-amber-500 group-hover:border-amber-500 transition-colors">
              <Database size={18} />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-sm">Recursos FiveM Propios</h4>
              <p className="text-slate-500 text-sm">Scripts exclusivos de alto rendimiento (0.01ms).</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center border border-slate-700 text-amber-500 group-hover:border-amber-500 transition-colors">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase text-sm">Seguridad & Anti-Cheat</h4>
              <p className="text-slate-500 text-sm">Protección de infraestructura y datos de usuarios.</p>
            </div>
          </div>
        </div>

        <PrimaryButton href="https://discord.gg/midasnetwork" icon={Disc}>
          Unirse al Discord
        </PrimaryButton>
      </motion.div>

      {/* Columna Visual - "Game Window" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-video bg-slate-900 border border-slate-700 relative overflow-hidden rounded-sm group shadow-2xl shadow-black/50">
          {/* Background Placeholder mimicking GTA V */}
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center overflow-hidden">
             {/* Abstract Cityscape representation */}
            <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,#000_100%),url('https://images.unsplash.com/photo-1605218427306-635ba2439715?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(251,191,36,0.05)_1px,transparent_2px)] bg-[size:30px_30px]" />

          {/* Game HUD UI Elements */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
            <div className="flex gap-1">
               {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-2 bg-slate-800 border border-slate-600 rounded-sm overflow-hidden"><div className="h-full bg-amber-500 w-full opacity-80" /></div>)}
            </div>
            <span className="font-mono text-[10px] text-amber-400">ARMOR 100%</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
            <div className="flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                   <span className="text-green-400 font-mono text-xs font-bold tracking-wider">ONLINE</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tighter">MIDAS ROLEPLAY <span className="text-amber-500">v3.0</span></h3>
                <p className="text-slate-400 font-mono text-[10px] mt-1">ID: 194.55.20.11 :: LOS SANTOS REGION</p>
              </div>
              <div className="hidden sm:flex gap-2">
                <span className="px-2 py-1 bg-slate-800/80 text-amber-500 border border-amber-500/30 text-[10px] rounded font-mono uppercase">ESX Legacy</span>
                <span className="px-2 py-1 bg-slate-800/80 text-blue-400 border border-blue-500/30 text-[10px] rounded font-mono uppercase">Voice: PMA</span>
              </div>
            </div>
          </div>

          {/* Crosshair Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full flex items-center justify-center pointer-events-none">
            <div className="w-1 h-1 bg-amber-500/80" />
            <div className="absolute top-0 bottom-0 w-px bg-white/10" />
            <div className="absolute left-0 right-0 h-px bg-white/10" />
          </div>
        </div>

        {/* Decoraciones Externas al Frame */}
        <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-amber-500/50 -z-10" />
        <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-amber-500/50 -z-10" />
      </motion.div>
    </div>
  </section>
);

const Projects = () => {
  const projects = [
    {
      name: "Gowla",
      tag: "PYTHON/DJANGO",
      status: "In Progress",
      preview: "#",
      image: null,
      featured: false,
    },
    {
      name: "UMBRYAXIS",
      tag: "REACT/D3.JS",
      status: "In Progress",
      preview: "#",
      image: null,
      featured: false,
    },
    {
      name: "Envios El Contenedor",
      tag: "NODE/POSTGRES",
      status: "In Progress",
      preview: "#",
      image: null,
      featured: false,
    },

    {
      name: "Euro Work Latin · Portal Web",
      tag: "REACT/TAILWIND/API",
      status: "Deployed",
      preview: "https://euroworklatin.com",
      image: "https://image.thum.io/get/width/1600/https://euroworklatin.com",
      featured: false,
    },
  ];

  return (
    <section className="relative z-10 py-32 px-6 bg-slate-950 border-t border-slate-900" id="proyectos">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="PROYECTOS RECIENTES" subtitle="Deployment Log" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.preview}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative bg-slate-900 border border-slate-800 p-5 group overflow-hidden block shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 transition-all"
            >
              {/* Featured Badge */}
              {p.featured && (
                <span className="absolute top-3 right-3 text-[9px] font-mono bg-amber-500 text-black px-2 py-1 rounded-sm tracking-widest">
                  FEATURED
                </span>
              )}

              {/* Top HUD */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.2),transparent_70%)]" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-950 border border-slate-700 text-amber-500">
                    <Code2 size={18} />
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-1 border ${
                      p.status === "Deployed"
                        ? "text-green-400 border-green-900 bg-green-900/20"
                        : "text-amber-400 border-amber-900 bg-amber-900/20"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{p.name}</h3>
                <p className="text-slate-500 text-[11px] font-mono mb-4">{p.tag}</p>

                {/* PREVIEW */}
                <div className="w-full h-32 bg-slate-950 border border-slate-800/50 rounded-sm overflow-hidden relative">
                  {p.image ? (
                    <>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-500 group-hover:scale-105"
                      />

                      {/* Blur cinematic */}
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-40 transition-all" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-600 text-xs font-mono">
                      [ IMAGE_PLACEHOLDER ]
                    </div>
                  )}
                </div>

              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative z-10 bg-slate-950 border-t border-slate-800 pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="max-w-xs">
        <h2 className="text-2xl font-bold text-white tracking-tight font-mono flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500" />
          MIDAS NETWORK
        </h2>
        <p className="text-slate-500 text-sm mt-4 font-light leading-relaxed">
          Arquitectura digital avanzada y experiencias interactivas.
          Diseñando el futuro, un nodo a la vez.
        </p>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-2">Network</h4>
          <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">Servicios</a>
          <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">Proyectos</a>
          <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">Gaming</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-2">Connect</h4>
          <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">Discord</a>
          <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">LinkedIn</a>
          <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition-colors">GitHub</a>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-mono uppercase tracking-widest">
      <p>© {new Date().getFullYear()} Midas Network EU. All Rights Reserved.</p>
      <p>System Status: Operational</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30 selection:text-amber-100 font-sans">
      <ArchitecturalBackground />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <GamingDivision />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default App;
