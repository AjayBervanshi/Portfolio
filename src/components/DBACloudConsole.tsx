import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SQLTerminal } from './SQLTerminal';
import { AlwaysOnSimulator } from './AlwaysOnSimulator';
import { DBADashboard } from './DBADashboard';
import { Contact } from './Contact';
import { Database, Terminal, Network, Activity, User, Briefcase, GraduationCap, Mail, Shield, Clock, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '@/utils/constants';
import { calculateExperience } from '@/utils/dateUtils';
import { Skills } from './Skills';
import { Card, CardContent } from './ui/card';

export const DBACloudConsole = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'query' | 'cluster' | 'telemetry' | 'experience' | 'contact'>('overview');
  const [time, setTime] = useState('');
  const [tps, setTps] = useState(840);
  const [cpu, setCpu] = useState(18);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu((prev) => Math.min(45, Math.max(12, Math.round(prev + (Math.random() - 0.5) * 4))));
      setTps((prev) => Math.min(950, Math.max(760, Math.round(prev + (Math.random() - 0.5) * 20))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'overview' as const, label: 'Overview HUD', icon: User, color: 'text-blue-400' },
    { id: 'query' as const, label: 'T-SQL Console', icon: Terminal, color: 'text-cyan-400' },
    { id: 'cluster' as const, label: 'AlwaysOn Group', icon: Network, color: 'text-purple-400' },
    { id: 'telemetry' as const, label: 'System Telemetry', icon: Activity, color: 'text-emerald-400' },
    { id: 'experience' as const, label: 'Career Ledger', icon: Briefcase, color: 'text-amber-400' },
    { id: 'contact' as const, label: 'Secure Message', icon: Mail, color: 'text-rose-400' }
  ];

  return (
    <div className="w-full min-h-[680px] rounded-2xl border border-slate-900 bg-slate-950/80 backdrop-blur-md shadow-2xl flex flex-col md:flex-row overflow-hidden select-none text-slate-100 relative">
      
      {/* 1. LEFT SIDEBAR PANEL */}
      <div className="w-full md:w-64 border-r border-slate-900 bg-slate-950/60 p-5 flex flex-col justify-between flex-shrink-0 z-20">
        <div className="space-y-8 text-left">
          {/* Logo / Brand Header */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <Database className="text-white" size={18} />
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-wide block">Ajay.DBA</span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Enterprise Console</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-mono text-xs text-left transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-slate-900 border border-slate-800 text-cyan-400 font-bold shadow-md shadow-cyan-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                }`}
              >
                <item.icon className={`${item.color} group-hover:scale-110 transition-transform`} size={14} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Administrator Details */}
        <div className="border-t border-slate-900 pt-4 mt-6 text-left space-y-3 font-mono text-[10px] text-slate-500">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center font-bold text-cyan-400">sa</div>
            <div>
              <span className="block font-bold text-slate-300">Ajay Bervanshi</span>
              <span className="text-[8px] text-slate-600">CLUSTER_ADMIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CENTRAL DASHBOARD VIEWPORT */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/20 z-10">
        
        {/* Dynamic Telemetry Header Bar */}
        <div className="bg-slate-950/60 px-6 py-4 border-b border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 z-20 font-mono text-xs text-slate-400">
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEM: NOMINAL</span>
            </div>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <span className="text-[10px]">CPU: <strong className="text-cyan-400">{cpu}%</strong></span>
            <span className="text-slate-800 hidden sm:inline">|</span>
            <span className="text-[10px]">THROUGHPUT: <strong className="text-purple-400">{tps} tps</strong></span>
          </div>

          <div className="flex items-center space-x-3 text-[10px] text-slate-400 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-lg">
            <Clock size={12} className="text-cyan-400" />
            <span>{time}</span>
            <span className="text-slate-700">|</span>
            <span className="text-cyan-400 font-bold">PALL-AG-01 (ACTIVE)</span>
          </div>
        </div>

        {/* Central Viewport Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'query' && <SQLTerminal />}
              {activeTab === 'cluster' && <AlwaysOnSimulator />}
              {activeTab === 'telemetry' && <DBADashboard />}
              {activeTab === 'contact' && <Contact />}

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8 font-mono text-left text-slate-300">
                  {/* Luxury Profile HUD Header */}
                  <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 backdrop-blur">
                    <div className="space-y-1.5">
                      <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] py-0.5 px-2.5 font-bold rounded-full mb-1">
                        DATABASE INFRASTRUCTURE ARCHITECT
                      </Badge>
                      <h3 className="text-2xl font-extrabold text-white tracking-tight">{PERSONAL_INFO.NAME}</h3>
                      <p className="text-xs text-cyan-400 font-bold font-mono">{PERSONAL_INFO.TITLE}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-slate-950 p-4 border border-slate-800/80 rounded-xl text-center min-w-[100px]">
                        <span className="text-2xl font-extrabold text-white block">{calculateExperience()}+</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-500">Years Exp</span>
                      </div>
                      <div className="bg-slate-950 p-4 border border-slate-800/80 rounded-xl text-center min-w-[100px]">
                        <span className="text-2xl font-extrabold text-emerald-400 block">99.9%</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-500">Uptime SLA</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <Card className="bg-slate-950/40 border-slate-900 p-5 backdrop-blur text-left">
                      <h4 className="text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2.5 mb-3 uppercase flex items-center">
                        <Shield className="mr-1.5" size={14} />
                        1. System Pitch
                      </h4>
                      <p className="text-slate-400 leading-relaxed text-[11px]">
                        Senior MS SQL Server Database Administrator specializing in administering, tuning, and securing production database environments.
                        Proven competence in deploying high-availability availability groups (AlwaysOn), PowerShell routine task automation, T-SQL query performance engineering, and AWS cloud instance operations.
                      </p>
                    </Card>

                    <Card className="bg-slate-950/40 border-slate-900 p-5 backdrop-blur text-left">
                      <h4 className="text-xs font-bold text-cyan-400 border-b border-slate-800 pb-2.5 mb-3 uppercase flex items-center">
                        <CheckCircle className="mr-1.5" size={14} />
                        2. Active Performance Targets
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-300">
                        <div className="bg-slate-950/60 p-2.5 border border-slate-900 rounded">
                          <div className="text-slate-500 uppercase text-[8px] font-bold">Query Latency</div>
                          <div className="text-cyan-400 font-bold text-sm mt-0.5">20% Decreased</div>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 border border-slate-900 rounded">
                          <div className="text-slate-500 uppercase text-[8px] font-bold">Log Failover RTO</div>
                          <div className="text-purple-400 font-bold text-sm mt-0.5">25% Reduction</div>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 border border-slate-900 rounded">
                          <div className="text-slate-500 uppercase text-[8px] font-bold">PowerShell Tasks</div>
                          <div className="text-amber-400 font-bold text-sm mt-0.5">40% Automated</div>
                        </div>
                        <div className="bg-slate-950/60 p-2.5 border border-slate-900 rounded">
                          <div className="text-slate-500 uppercase text-[8px] font-bold">Active Support</div>
                          <div className="text-emerald-400 font-bold text-sm mt-0.5">24/7 SLA</div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Skills Grid */}
                  <Skills />
                </div>
              )}

              {/* EXPERIENCE LEDGER */}
              {activeTab === 'experience' && (
                <div className="space-y-6 font-mono text-xs text-slate-300 text-left">
                  <h4 className="text-sm font-bold text-cyan-400 border-b border-slate-900 pb-2.5 uppercase tracking-wider flex items-center">
                    <Briefcase size={16} className="mr-2" />
                    Career Ledger Transactions
                  </h4>

                  <div className="relative border-l border-slate-900 pl-4 ml-2 space-y-8">
                    {/* Pall Corp */}
                    <div className="relative space-y-2 text-left">
                      <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-950 shadow shadow-cyan-500/20" />
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-bold text-white text-sm block">MS SQL Database Administrator</span>
                          <span className="text-cyan-400 font-semibold">Pall Corporation</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Sep 2025 - Present
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Administer and maintain MS SQL Server databases ensuring optimal performance, reliability, and security.
                        Manage AWS EC2 instances hosting production SQL clusters. Build CloudWatch metrics and S3 automated recovery logs.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['SQL Server 2022', 'AWS EC2', 'RDS', 'T-SQL', 'CloudWatch', 'Clustering'].map(t => (
                          <span key={t} className="bg-slate-900 text-cyan-400/80 border border-cyan-500/10 px-2.5 py-0.5 rounded-[4px] text-[9px]">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Wipro */}
                    <div className="relative space-y-2 text-left">
                      <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-400 border border-slate-950 shadow shadow-purple-500/20" />
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-bold text-white text-sm block">MS SQL Database Administrator</span>
                          <span className="text-purple-400 font-semibold">Wipro Limited</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Jul 2022 - Sep 2025
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Ensured 99.9% SLA uptime for critical banking application environments. 
                        Optimized database indexing and T-SQL query performance by 20%. 
                        Automated 40% of maintenance tasks using PowerShell, decreasing manual labor overhead.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Clustering', 'T-SQL Scripting', 'PowerShell', 'Performance Tuning', 'Disaster Recovery'].map(t => (
                          <span key={t} className="bg-slate-900 text-purple-400/80 border border-purple-500/10 px-2.5 py-0.5 rounded-[4px] text-[9px]">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* BCA */}
                    <div className="relative space-y-2 text-left">
                      <div className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 border border-slate-950 shadow shadow-indigo-500/20" />
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <span className="font-bold text-white text-sm block">Bachelor of Computer Application (BCA)</span>
                          <span className="text-indigo-400 font-semibold">G.H. Raisoni Institute Of IT</span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Graduated May 2022
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Specialized in Database Management Systems, software engineering, and web development. Graduated with honors (GPA: 8.2/10).
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
