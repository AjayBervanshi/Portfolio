import { useState, useEffect } from 'react';
import { SQLTerminal } from './SQLTerminal';
import { AlwaysOnSimulator } from './AlwaysOnSimulator';
import { DBADashboard } from './DBADashboard';
import { Contact } from './Contact';
import { Database, Terminal, Shield, Clock, ShieldAlert, Cpu, Award, MapPin, Mail, Phone, CalendarDays } from 'lucide-react';
import { PERSONAL_INFO } from '@/utils/constants';
import { calculateExperience, formatExperience } from '@/utils/dateUtils';

export const DBADatadogGrid = () => {
  const [time, setTime] = useState('');
  const [cpu, setCpu] = useState(18);
  const [connections, setConnections] = useState(143);
  const [tps, setTps] = useState(840);

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
      setConnections((prev) => Math.min(160, Math.max(130, Math.round(prev + (Math.random() - 0.5) * 5))));
      setTps((prev) => Math.min(950, Math.max(760, Math.round(prev + (Math.random() - 0.5) * 20))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-950/60 border border-slate-900 rounded-3xl backdrop-blur-md shadow-2xl p-6 flex flex-col justify-start gap-6 select-none text-slate-100">
      
      {/* 1. OPERATIONS DASHBOARD HUD HEADER */}
      <div className="bg-slate-950/90 border border-slate-900 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 font-mono text-xs text-slate-400 shadow-lg">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Database className="text-white animate-pulse" size={20} />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-wide block uppercase">CDOC Operations Cockpit</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest">Active System: PallAG-Nagpur-Cluster</span>
          </div>
        </div>

        <div className="flex items-center space-x-6 flex-wrap gap-y-2">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px]">CLUSTER: HEALTHY</span>
          </div>
          <span className="text-slate-800 hidden sm:inline">|</span>
          <div className="flex items-center space-x-1">
            <Cpu size={12} className="text-cyan-400" />
            <span className="text-[10px]">CPU: <strong className="text-cyan-400">{cpu}%</strong></span>
          </div>
          <span className="text-slate-800 hidden sm:inline">|</span>
          <span className="text-[10px]">THROUGHPUT: <strong className="text-purple-400">{tps} tps</strong></span>
          <span className="text-slate-800 hidden sm:inline">|</span>
          <span className="text-[10px]">SESSIONS: <strong className="text-indigo-400">{connections}</strong></span>
        </div>

        <div className="flex items-center space-x-3 text-[10px] text-slate-400 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-lg self-start lg:self-center">
          <Clock size={12} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{time}</span>
          <span className="text-slate-700">|</span>
          <span className="text-cyan-400 font-bold">sa (administrator)</span>
        </div>
      </div>

      {/* 2. FOUR-QUADRANT MONITORING GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        
        {/* Quadrant 1: SSMS Query Terminal */}
        <div className="border border-slate-900 rounded-2xl overflow-hidden shadow-xl flex flex-col bg-slate-950/40 min-h-[500px]">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest flex items-center">
              <Terminal size={14} className="mr-1.5" />
              1. T-SQL Query Analyzer Console
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <SQLTerminal />
          </div>
        </div>

        {/* Quadrant 2: AlwaysOn Availability Group Simulator */}
        <div className="border border-slate-900 rounded-2xl overflow-hidden shadow-xl flex flex-col bg-slate-950/40 min-h-[500px]">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-purple-400 uppercase tracking-widest flex items-center">
              <Shield className="mr-1.5" size={14} />
              2. AlwaysOn Availability Group Manager
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <AlwaysOnSimulator />
          </div>
        </div>

        {/* Quadrant 3: Telemetry Monitor & Incident Response */}
        <div className="border border-slate-900 rounded-2xl overflow-hidden shadow-xl flex flex-col bg-slate-950/40 min-h-[480px]">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest flex items-center">
              <ShieldAlert size={14} className="mr-1.5 text-emerald-400" />
              3. Telemetry Monitor & Incident Resolving Desk
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <DBADashboard />
          </div>
        </div>

        {/* Quadrant 4: Executive Portfolio Overview & Supabase messaging */}
        <div className="border border-slate-900 rounded-2xl overflow-hidden shadow-xl flex flex-col bg-slate-950/40 min-h-[480px]">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-widest flex items-center">
              <Mail size={14} className="mr-1.5" />
              4. Executive Ledger & Contact terminal
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
            {/* Monospace CV Summary Card */}
            <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl text-left space-y-4 font-mono text-xs">
              <div className="border-b border-slate-800 pb-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white uppercase">{PERSONAL_INFO.NAME}</h4>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-bold text-[9px]">
                    XP: {calculateExperience()}+ YRS
                  </span>
                </div>
                <p className="text-[10px] text-cyan-400 font-bold mt-1">{PERSONAL_INFO.TITLE}</p>
              </div>

              <div className="space-y-3">
                <div className="text-slate-400 leading-relaxed text-[11px]">
                  MS SQL Server Database Administrator with expertise administering production environments.
                  Proven capabilities in **AlwaysOn Clustering**, **backup strategies**, **T-SQL indexing & tuning**, and **AWS database hosting**.
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10px] pt-1">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <MapPin size={12} className="text-cyan-400" />
                    <span>Nagpur, India</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Mail size={12} className="text-cyan-400" />
                    <span className="truncate">ajay.bervanshi@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Phone size={12} className="text-cyan-400" />
                    <span>+91 7620 085260</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <CalendarDays size={12} className="text-cyan-400" />
                    <span>Active DBA Roles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct-write Supabase Connection console */}
            <Contact />
          </div>
        </div>

      </div>
    </div>
  );
};
