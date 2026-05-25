import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, Calendar, MapPin, ChevronDown, ChevronUp, 
  Terminal, ShieldCheck, Zap, Server, Code, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
  id: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  summary: string;
  operations: string[];
  tech: string[];
  metrics: { label: string; value: string; icon: any }[];
}

export const FuturisticTimeline = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1); // Pall Corp expanded by default

  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior MS SQL Database Administrator",
      company: "Pall Corporation",
      duration: "Sept 2025 — Present",
      location: "Pune, Maharashtra, India (Hybrid)",
      type: "Full-Time",
      summary: "Direct the administration and optimization of critical MS SQL database engines. Build scalable high-availability AlwaysOn clusters, optimize AWS EC2 virtual compute clusters, and maintain extreme system uptime SLA targets.",
      operations: [
        "Architect and maintain high-performance multi-node AlwaysOn Availability Group configurations, guaranteeing data failover synchronization.",
        "Govern AWS EC2 SQL Server compute deployments, designing storage configurations and IOPS limits.",
        "Perform extensive index structures rebuild plans and run execution diagnostics, reducing average system read query latency.",
        "Collaborate with development leads to implement secure user permissions schemas and maintain SOX/GDPR regulatory security.",
        "Integrate automated monitoring hooks with AWS CloudWatch and custom Powershell alert frameworks."
      ],
      tech: ["SQL Server 2022", "T-SQL Tuning", "AlwaysOn AG", "AWS EC2", "Powershell Automation", "SSMS Profiler", "Performance Monitor"],
      metrics: [
        { label: "Active Nodes Sync", value: "2 Nodes Sync", icon: Server },
        { label: "Storage Managed", value: "4.5 TB+", icon: Building },
        { label: "Avg Latency", value: "18 ms Avg", icon: Zap }
      ]
    },
    {
      id: 2,
      title: "MS SQL Database Administrator",
      company: "Wipro Limited",
      duration: "July 2022 — Sept 2025",
      location: "Mumbai, Maharashtra, India (Full-Time)",
      type: "Full-Time",
      summary: "Managed the operational database administration lifecycle for major corporate banking clients. Spearheaded replication failover architectures, routine maintenance automation scripts, and critical disaster recovery drills.",
      operations: [
        "Guaranteed 99.9% uptime SLA compliance for mission-critical core banking transaction databases.",
        "Re-engineered indexes and optimized parallel MAXDOP hints, boosting general transaction speeds by 20%.",
        "Orchestrated quarterly disaster recovery simulations and failovers, lowering RTO durations by 25%.",
        "Automated 40% of routine health-check, sizing alerts, and transaction log backup tasks with robust PowerShell scripts."
      ],
      tech: ["SQL Server 2019", "Database Replication", "AlwaysOn Cluster", "Query Tuning", "Powershell Automation", "Disaster Recovery"],
      metrics: [
        { label: "Automation Scripts", value: "24 Powershell", icon: Code },
        { label: "Banking Uptime", value: "99.9% SLA", icon: ShieldCheck },
        { label: "DR Target RTO", value: "< 30 Mins", icon: Zap }
      ]
    },
    {
      id: 3,
      title: "Front-End Web Developer - Intern",
      company: "Sankalpsoft Solution",
      duration: "Sept 2021 — Oct 2021",
      location: "Remote, India (Internship)",
      type: "Internship",
      summary: "Designed and engineered interactive web layouts, digital assets, and form connections, obtaining strong foundational skills in structured UI and database client-side integration.",
      operations: [
        "Crafted dynamic responsive landing templates using HTML5, CSS3, and JavaScript.",
        "Built blood registration dashboard forms featuring clean client-side validation and database storage hooks.",
        "Collaborated with project managers to translate client mockups into high-performance web products."
      ],
      tech: ["HTML5 / CSS3", "JavaScript ES6", "Responsive Layouts", "Form Integration"],
      metrics: [
        { label: "Web Optimization", value: "90+ Score", icon: Sparkles },
        { label: "Mobile Sync", value: "100% Fluid", icon: ShieldCheck },
        { label: "Layouts Delivered", value: "3 Projects", icon: Code }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white">
          Professional Chronicles
        </h2>
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
          Chronological logs detailing corporate database achievements and operational case studies
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 md:px-0">
        {/* Glowing Center Line timeline (Desktops) */}
        <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[1px] bg-gradient-to-b from-cyan-400 via-purple-500 to-indigo-500 opacity-20 hidden md:block" />

        <div className="space-y-10">
          {jobs.map((job, idx) => {
            const isLeft = idx % 2 === 0;
            const isExpanded = expandedId === job.id;

            return (
              <div 
                key={job.id} 
                className={`relative flex flex-col md:flex-row items-stretch ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Timeline center node dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-md shadow-cyan-400/20 -translate-x-[6px] md:-translate-x-2 z-10 top-6" />

                {/* Main Job Card container */}
                <div className={`w-full md:w-[46%] pl-12 md:pl-0 ${
                  isLeft ? 'md:text-right' : 'md:text-left'
                }`}>
                  <Card 
                    onMouseEnter={() => setExpandedId(job.id)}
                    onMouseLeave={() => setExpandedId(null)}
                    className="bg-slate-950/65 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden relative group hover:border-cyan-500/40 transition-colors duration-300"
                  >
                    <CardContent className="p-6 space-y-4">
                      {/* Job Header */}
                      <div className="space-y-2">
                        <div className={`flex flex-wrap items-center gap-2 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}>
                          <Badge className="bg-slate-900 text-cyan-400 border border-cyan-500/20 text-[9px] font-mono font-bold tracking-wider rounded-md uppercase py-0.5">
                            {job.type}
                          </Badge>
                          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                            <Calendar size={10} />
                            {job.duration}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white tracking-tight uppercase leading-snug">
                          {job.title}
                        </h4>

                        <div className={`flex items-center gap-1.5 text-xs font-mono text-slate-400 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}>
                          <Building size={12} className="text-purple-400" />
                          <span className="font-bold text-slate-300">{job.company}</span>
                          <span className="text-slate-600">|</span>
                          <MapPin size={12} />
                          <span className="truncate max-w-[150px]">{job.location}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {job.summary}
                      </p>

                      {/* Expandable debrief panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-4 pt-4 border-t border-slate-900 text-left"
                          >
                            {/* Key Stats widgets */}
                            <div className="grid grid-cols-3 gap-2.5">
                              {job.metrics.map((metric, i) => (
                                <div key={i} className="bg-slate-900/50 border border-slate-850 p-2.5 rounded-xl text-center">
                                  <metric.icon size={12} className="text-cyan-400 mx-auto mb-1" />
                                  <span className="text-[9px] font-black text-white font-mono block tracking-tight">{metric.value}</span>
                                  <span className="text-[7px] font-mono text-slate-500 uppercase block mt-0.5 tracking-wider truncate">{metric.label}</span>
                                </div>
                              ))}
                            </div>

                            {/* Bullet points operations */}
                            <div className="space-y-2">
                              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                                Technical Operations Debrief
                              </span>
                              <ul className="space-y-1.5 pl-1.5">
                                {job.operations.map((op, i) => (
                                  <li key={i} className="text-[11px] text-slate-300 font-sans leading-relaxed flex items-start gap-1.5">
                                    <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                                    <span>{op}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tech Badges */}
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                                Core Arsenal Managed
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {job.tech.map((t, i) => (
                                  <Badge key={i} className="bg-slate-900 text-slate-400 border border-slate-850 rounded-md text-[9px] font-mono py-0.5 px-2">
                                    {t}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
