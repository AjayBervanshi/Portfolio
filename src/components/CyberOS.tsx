import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQLTerminal } from './SQLTerminal';
import { AlwaysOnSimulator } from './AlwaysOnSimulator';
import { DBADashboard } from './DBADashboard';
import { Contact } from './Contact';
import { Database, Terminal, Network, Activity, User, Briefcase, GraduationCap, Mail, X, Minus, Square, Shield, Clock, HelpCircle, HardDrive } from 'lucide-react';
import { PERSONAL_INFO } from '@/utils/constants';
import { calculateExperience, formatExperience } from '@/utils/dateUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from './ui/button';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export const CyberOS = () => {
  const isMobile = useIsMobile();
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [activeWindows, setActiveWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // 1. BIOS Boot Sequence
  useEffect(() => {
    const logs = [
      'AJAY-BIOS v4.12 // CRITICAL SYSTEM CHECK...',
      'Memory Test: 16384MB OK',
      'Detecting Database Engine... MS SQL Server 2022 (RTM-CU12) detected.',
      'Checking cluster replicas sync state... Nagpur [ONLINE] | Pune [ONLINE]',
      'Verifying AlwaysOn Availability Group Listener status... ALIGNED.',
      'Mounting Supabase Remote messaging ledger... CONNECTED.',
      'Verifying RLS access control policies... OK.',
      'Loading DBA command center shell v2.0...',
      'Initialization successful. Desktop GUI active.'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // 2. Interactive System Clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Desktop Application Configuration
  const APPS = [
    { id: 'query', title: 'Query_Analyzer.exe', label: 'Query Analyzer', icon: Terminal, color: 'text-cyan-400' },
    { id: 'cluster', title: 'AlwaysOn_Manager.exe', label: 'Availability Group', icon: Network, color: 'text-purple-400' },
    { id: 'monitor', title: 'Telemetry_Monitor.exe', label: 'Telemetry Monitor', icon: Activity, color: 'text-emerald-400' },
    { id: 'about', title: 'About_Me.txt', label: 'About Ajay', icon: User, color: 'text-blue-400' },
    { id: 'experience', title: 'Experience_Ledger.exe', label: 'Work Experience', icon: Briefcase, color: 'text-amber-400' },
    { id: 'contact', title: 'Contact_Terminal.exe', label: 'Contact Term', icon: Mail, color: 'text-rose-400' }
  ];

  // 4. Window Operations
  const openWindow = (id: string) => {
    setShowStartMenu(false);
    
    const existing = activeWindows.find(w => w.id === id);
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);

    if (existing) {
      // If minimized, restore it. Bring to front.
      setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w));
    } else {
      const app = APPS.find(a => a.id === id);
      if (app) {
        setActiveWindows(prev => [...prev, {
          id,
          title: app.title,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZ
        }]);
      }
    }
  };

  const closeWindow = (id: string) => {
    setActiveWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const toggleMaximize = (id: string) => {
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w));
  };

  // Open critical window initially on load
  useEffect(() => {
    if (!booting) {
      // Open About Ajay and Query Analyzer by default
      openWindow('about');
      setTimeout(() => openWindow('query'), 200);
    }
  }, [booting]);

  if (booting) {
    return (
      <div className="fixed inset-0 bg-[#020617] text-slate-100 font-mono text-xs flex flex-col justify-between p-6 z-50 overflow-hidden leading-relaxed text-left">
        <div className="max-w-3xl space-y-4">
          <div className="border border-slate-800 p-4 bg-slate-950/80 rounded space-y-2">
            <h1 className="text-sm font-bold text-cyan-400 flex items-center">
              <Database size={16} className="mr-2 animate-spin" />
              AJAY BERVANHI OPERATING COCKPIT (RTM-CU12)
            </h1>
            <p className="text-[10px] text-slate-500">Copyright (C) 2026. All rights reserved.</p>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed text-slate-300">
            {bootLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-cyan-500 mr-2">&gt;</span> {log}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-600 flex justify-between border-t border-slate-900 pt-4">
          <span>Initializing System Kernel...</span>
          <span> Nagpur Node: ONLINE </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[95vh] rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur overflow-hidden flex flex-col justify-between shadow-2xl relative select-none">
      {/* Decorative desktop grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Desktop Workspace */}
      <div className="flex-1 p-6 relative flex flex-col justify-start items-start gap-5 content-start flex-wrap overflow-hidden">
        
        {/* Floating Icons */}
        {APPS.map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWindow(app.id)}
            className="w-20 flex flex-col items-center space-y-2 text-center focus:outline-none group z-10"
          >
            <div className="w-12 h-12 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-cyan-500/40 group-hover:bg-slate-900/90 transition-all duration-200">
              <app.icon className={`${app.color} group-hover:scale-110 transition-transform`} size={22} />
            </div>
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-white font-semibold truncate max-w-full drop-shadow">
              {app.title}
            </span>
          </motion.button>
        ))}

        {/* Windows Workspace Render */}
        <AnimatePresence>
          {activeWindows.map((win) => {
            if (win.isMinimized) return null;
            return (
              <motion.div
                key={win.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                drag={!win.isMaximized && !isMobile}
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 900, top: 0, bottom: 500 }}
                onPointerDown={() => focusWindow(win.id)}
                style={{ zIndex: win.zIndex }}
                className={`absolute border border-slate-800 bg-slate-950/95 shadow-2xl rounded-xl flex flex-col overflow-hidden text-left ${
                  win.isMaximized 
                    ? 'inset-2 z-40' 
                    : isMobile
                    ? 'inset-4 w-auto h-auto max-h-[85vh]'
                    : 'w-[680px] h-[450px] left-1/4 top-12'
                }`}
              >
                {/* Window Title Header Bar */}
                <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-900 flex items-center justify-between flex-shrink-0 cursor-move select-none select-none">
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                    <Database size={12} className="text-cyan-400" />
                    <span className="font-bold">{win.title}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={() => minimizeWindow(win.id)}
                      className="text-slate-500 hover:text-slate-100 transition-colors focus:outline-none"
                    >
                      <Minus size={12} />
                    </button>
                    <button
                      onClick={() => toggleMaximize(win.id)}
                      className="text-slate-500 hover:text-slate-100 transition-colors focus:outline-none hidden sm:block"
                    >
                      <Square size={10} />
                    </button>
                    <button
                      onClick={() => closeWindow(win.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors focus:outline-none"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>

                {/* Window Scrollable Content Area */}
                <div className="flex-1 overflow-auto bg-slate-950/40 scrollbar-thin">
                  {win.id === 'query' && <SQLTerminal />}
                  {win.id === 'cluster' && <AlwaysOnSimulator />}
                  {win.id === 'monitor' && <DBADashboard />}
                  {win.id === 'contact' && <Contact />}
                  
                  {/* APP ABOUT ME */}
                  {win.id === 'about' && (
                    <div className="p-6 font-mono text-xs text-slate-300 space-y-6 leading-relaxed">
                      <div className="border border-cyan-500/20 bg-cyan-950/20 p-4 rounded-lg flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider">{PERSONAL_INFO.NAME}</h4>
                          <p className="text-cyan-400 font-bold">{PERSONAL_INFO.TITLE}</p>
                          <p className="text-[10px] text-slate-500"> Nagpur, Maharashtra, India</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-extrabold text-white block">{calculateExperience()}+</span>
                          <span className="text-[9px] uppercase tracking-wider text-slate-500">Years Experience</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="font-bold text-cyan-400 border-b border-slate-900 pb-1.5 flex items-center">
                          <User size={14} className="mr-1.5" />
                          1. Professional Executive Summary
                        </h5>
                        <p className="text-[11px] text-slate-400">
                          Senior Database Administrator with intensive expertise administering business-critical databases.
                          Specializes in Availability Groups (HA/DR), disaster recovery setups, resource performance tuning, 
                          AWS database hosting, and automated PowerShell scripting. Highly reliable under high-stress incident workloads.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h5 className="font-bold text-cyan-400 border-b border-slate-900 pb-1.5 flex items-center">
                          <Shield size={14} className="mr-1.5" />
                          2. Key Enterprise Metrics
                        </h5>
                        <div className="grid grid-cols-2 gap-4 text-[11px]">
                          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800/80">
                            <span className="text-slate-500 block uppercase text-[9px]">Uptime Maintained</span>
                            <span className="text-emerald-400 font-bold text-sm">99.9% Uptime SLA</span>
                          </div>
                          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800/80">
                            <span className="text-slate-500 block uppercase text-[9px]">Query Optimizations</span>
                            <span className="text-cyan-400 font-bold text-sm">20% Latency Drop</span>
                          </div>
                          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800/80">
                            <span className="text-slate-500 block uppercase text-[9px]">DR RTO Reduction</span>
                            <span className="text-purple-400 font-bold text-sm">25% Faster Failover</span>
                          </div>
                          <div className="bg-slate-900/40 p-2.5 rounded border border-slate-800/80">
                            <span className="text-slate-500 block uppercase text-[9px]">Automation Yield</span>
                            <span className="text-amber-400 font-bold text-sm">40% Tasks Automated</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP EXPERIENCE */}
                  {win.id === 'experience' && (
                    <div className="p-6 font-mono text-xs text-slate-300 space-y-6 text-left">
                      <h4 className="text-sm font-bold text-cyan-400 border-b border-slate-900 pb-2 flex items-center">
                        <Briefcase size={16} className="mr-2" />
                        Professional Career Ledger
                      </h4>

                      <div className="space-y-6 pl-2 relative border-l border-slate-800 ml-2">
                        {/* Pall Corp */}
                        <div className="relative space-y-1.5">
                          <div className="absolute -left-[14px] top-1.5 w-2 h-2 rounded-full bg-cyan-400" />
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-white block">MS SQL Database Administrator</span>
                              <span className="text-cyan-400">Pall Corporation</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-semibold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800/40">
                              Sep 2025 - Present
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Administered critical databases on AWS EC2 instances, deploying RDS, S3, and CloudWatch metrics. 
                            Maintained indexing strategies and structured failovers.
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {['SQL Server', 'AWS EC2', 'RDS', 'SSMS', 'Performance Monitor'].map(t => (
                              <span key={t} className="bg-slate-900 text-cyan-400/80 border border-cyan-500/10 px-2 py-0.5 rounded text-[9px]">{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* Wipro */}
                        <div className="relative space-y-1.5">
                          <div className="absolute -left-[14px] top-1.5 w-2 h-2 rounded-full bg-purple-400" />
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-white block">MS SQL Database Administrator</span>
                              <span className="text-purple-400">Wipro Limited</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-semibold bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800/40">
                              Jul 2022 - Sep 2025
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Ensured 99.9% uptime for business-critical banking portals. Automated 40% of routine index rebuilding 
                            and statistics cleanups via PowerShell scripts. Optimized SQL queries by 20%.
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {['T-SQL', 'PowerShell', 'AG Clustering', 'Backup DR drills'].map(t => (
                              <span key={t} className="bg-slate-900 text-purple-400/80 border border-purple-500/10 px-2 py-0.5 rounded text-[9px]">{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Cyber Taskbar Shell */}
      <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400 font-mono z-50 flex-shrink-0 relative backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          {/* Start Menu trigger */}
          <Button
            size="sm"
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="h-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-mono text-xs px-4 rounded shadow border border-cyan-500/20"
          >
            <Shield size={14} className="mr-1.5" />
            Start Menu
          </Button>

          <span className="text-slate-700">|</span>

          {/* Active tasks shortcuts in Taskbar */}
          <div className="flex space-x-2">
            {activeWindows.map(win => (
              <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className={`px-3 py-1.5 rounded text-[10px] border font-semibold flex items-center space-x-1.5 transition-all ${
                  win.isMinimized
                    ? 'bg-slate-950/20 border-slate-800/50 text-slate-500'
                    : 'bg-slate-950/90 border-cyan-500/25 text-cyan-400 shadow-md shadow-cyan-500/5'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${win.isMinimized ? 'bg-slate-700' : 'bg-cyan-400'}`} />
                <span>{win.title.replace('.exe', '').replace('.txt', '')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Time and connection status indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px]">SYNC REPLICAS: 3/3</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5 text-slate-300 font-bold">
            <Clock size={12} className="text-cyan-400" />
            <span className="font-mono text-xs">{time}</span>
          </div>
        </div>

        {/* DRAG-AND-DROP START MENU OVERLAY */}
        <AnimatePresence>
          {showStartMenu && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-12 left-4 w-72 border border-slate-800 bg-slate-950 shadow-2xl rounded-xl p-4 space-y-4 text-left z-[999]"
            >
              <div className="border-b border-slate-900 pb-2.5">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">{PERSONAL_INFO.NAME}</h4>
                <p className="text-[9px] text-slate-500 font-mono mt-0.5">sa (administrator)</p>
              </div>

              {/* Start Menu application items list */}
              <div className="space-y-1">
                <div className="text-[9px] uppercase font-bold text-slate-600 font-mono tracking-widest pl-1.5 mb-1.5">Applications</div>
                {APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => openWindow(app.id)}
                    className="w-full flex items-center space-x-3 px-2 py-2 hover:bg-slate-900 rounded-lg text-slate-300 hover:text-white transition-colors"
                  >
                    <app.icon className={app.color} size={14} />
                    <span className="font-mono text-xs">{app.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
