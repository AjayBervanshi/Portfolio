import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, Shield, Terminal, Zap, Cpu, Award, MapPin, 
  Mail, Phone, Linkedin, Calendar, Server, Activity, Flame
} from 'lucide-react';
import { PERSONAL_INFO } from '@/utils/constants';
import { calculateExperience } from '@/utils/dateUtils';
import { openLinkedIn } from '@/utils/navigation';
import { SQLTerminal } from './SQLTerminal';
import { AlwaysOnSimulator } from './AlwaysOnSimulator';
import { DBADashboard } from './DBADashboard';

export const CyberDBAWorkspace = () => {
  const [activeTab, setActiveTab] = useState<'alwayson' | 'tsql' | 'incidents'>('alwayson');
  const [liveUptime, setLiveUptime] = useState(99.999000);
  const yearsOfExperience = calculateExperience();

  // Tick the live database availability SLA up by tiny decimal amounts to simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUptime(prev => {
        const drift = (Math.random() - 0.5) * 0.000002;
        const nextVal = prev + drift;
        return nextVal > 99.999999 ? 99.999000 : nextVal < 99.998500 ? 99.999100 : nextVal;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Listen for global tab switch dispatch triggers
  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<'alwayson' | 'tsql' | 'incidents'>;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
        const element = document.getElementById("operations-center");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('switch-dba-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-dba-tab', handleSwitchTab);
  }, []);

  const profileMetrics = [
    { label: "AVAILABILITY SLA", value: `${liveUptime.toFixed(6)}%`, icon: Activity, color: "text-emerald-400" },
    { label: "MANAGED DATA", value: "5.5 TB+", icon: Database, color: "text-cyan-400" },
    { label: "QUERY TUNING EFFICIENCY", value: "20% SPEEDUP ↑", icon: Zap, color: "text-amber-400" },
    { label: "RTO DEFENSE THRESHOLD", value: "< 30 MINS", icon: Shield, color: "text-purple-400" }
  ];

  const skillBadges = {
    "Core Admin": ["SQL Server 2016-2022", "DB Engine Tuning", "Backup & Restore", "Index Maintenance"],
    "High Availability": ["AlwaysOn AG", "Failover Clustering", "Database Mirroring", "Replication", "DR Drills"],
    "Automation": ["T-SQL Scripting", "PowerShell", "Automated Monitors", "Maintenance Plans"],
    "Cloud & Security": ["AWS EC2", "AWS RDS", "Azure SQL", "User Access Control", "Data Encryption"]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Personal HUD & Skills Deck (4/12 Width) */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl shadow-2xl relative overflow-hidden group">
          {/* Cyan corner light aura */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300" />
          
          <CardContent className="p-8 space-y-6">
            {/* Core DBA Profile Info */}
            <div className="flex flex-col items-center text-center space-y-4 pt-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-cyan-400/50 flex items-center justify-center shadow-lg relative z-10 overflow-hidden group-hover:border-cyan-400 transition-colors duration-300">
                  <Database size={42} className="text-cyan-400 animate-pulse" />
                </div>
                {/* Visual pulse indicator */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-25" />
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-white font-sans uppercase">
                  {PERSONAL_INFO.NAME}
                </h3>
                <p className="text-xs font-mono font-bold tracking-wider text-cyan-400 mt-1 uppercase">
                  {PERSONAL_INFO.TITLE}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
                  <MapPin size={12} className="text-cyan-400" />
                  Pune / Nagpur, India
                </span>
                <span className="flex items-center gap-1 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
                  <Calendar size={12} className="text-purple-400" />
                  {yearsOfExperience}+ Years DBA
                </span>
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Live calculated metrics widgets */}
            <div className="grid grid-cols-2 gap-4">
              {profileMetrics.map((metric, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700/60 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500">{metric.label}</span>
                    <metric.icon size={14} className={metric.color} />
                  </div>
                  <span className="text-sm font-black font-mono text-white tracking-tight">{metric.value}</span>
                </div>
              ))}
            </div>

            <hr className="border-slate-800" />

            {/* Structured modern skills tags */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">Database Domain Arsenal</span>
              </div>

              <div className="space-y-3 pt-2">
                {Object.entries(skillBadges).map(([category, tags], i) => (
                  <div key={i} className="text-left space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block">{category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag, j) => (
                        <Badge key={j} className="bg-slate-900 hover:bg-slate-850 text-slate-300 text-[10px] py-1 px-2 border border-slate-800 font-mono font-medium rounded-md">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Contact quick links */}
            <div className="flex items-center justify-around text-slate-400 pt-2">
              <a href={`mailto:${PERSONAL_INFO.EMAIL}`} title="Email Direct" className="hover:text-cyan-400 transition-colors p-2 bg-slate-900/50 rounded-full border border-slate-800 hover:border-cyan-500/30">
                <Mail size={18} />
              </a>
              <a href={`tel:${PERSONAL_INFO.PHONE}`} title="Phone Direct" className="hover:text-cyan-400 transition-colors p-2 bg-slate-900/50 rounded-full border border-slate-800 hover:border-cyan-500/30">
                <Phone size={18} />
              </a>
              <button onClick={openLinkedIn} title="LinkedIn" className="hover:text-cyan-400 transition-colors p-2 bg-slate-900/50 rounded-full border border-slate-800 hover:border-cyan-500/30">
                <Linkedin size={18} />
              </button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* RIGHT COLUMN: Tabbed Active DBA Workspace Console (8/12 Width) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Dynamic Glass Tabs Controls */}
        <div className="flex p-1.5 bg-slate-950/80 border-[0.5px] border-slate-800/80 backdrop-blur-md rounded-2xl gap-2">
          <button
            onClick={() => setActiveTab('alwayson')}
            className={`flex-1 py-3 px-4 font-mono text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'alwayson'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Server size={14} />
            AlwaysOn AG Topology
          </button>
          
          <button
            onClick={() => setActiveTab('tsql')}
            className={`flex-1 py-3 px-4 font-mono text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'tsql'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Terminal size={14} />
            T-SQL Console IDE
          </button>
          
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex-1 py-3 px-4 font-mono text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'incidents'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Cpu size={14} />
            Play DBA HUD
          </button>
        </div>

        {/* Workspace Display Area */}
        <div className="transition-all duration-300">
          {activeTab === 'alwayson' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AlwaysOnSimulator />
            </div>
          )}

          {activeTab === 'tsql' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <SQLTerminal />
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <DBADashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
