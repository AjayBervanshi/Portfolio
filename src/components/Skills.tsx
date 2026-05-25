import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Shield, Code, Settings, Users, Zap, TrendingUp, BarChart3, Clock } from "lucide-react";
import { SKILL_START_DATES, SKILL_LEVELS } from "@/utils/constants";
import { formatExperience } from "@/utils/dateUtils";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const Skills = () => {
  const skillCategories = [
    {
      title: "Database Management",
      icon: Database,
      description: "Core database administration and optimization",
      skills: [
        { name: "SQL Server Administration (2016/2019/2022)", level: SKILL_LEVELS.EXPERT, startDate: SKILL_START_DATES.CORE_SKILLS },
        { name: "Database Performance Tuning", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.MID_SKILLS },
        { name: "Query Optimization", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.MID_SKILLS },
        { name: "Backup & Recovery Planning", level: SKILL_LEVELS.EXPERT, startDate: SKILL_START_DATES.CORE_SKILLS },
        { name: "Database Health Monitoring", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.MID_SKILLS }
      ]
    },
    {
      title: "High Availability & DR",
      icon: Server,
      description: "Enterprise-level availability solutions",
      skills: [
        { name: "Database Clustering", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.ADVANCED_SKILLS },
        { name: "Database Mirroring", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.ADVANCED_SKILLS },
        { name: "Disaster Recovery Planning", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.ADVANCED_SKILLS },
        { name: "Failover Processes", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.ADVANCED_SKILLS },
        { name: "AlwaysOn Availability Groups", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.ADVANCED_SKILLS }
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Data protection and regulatory compliance",
      skills: [
        { name: "User Access Control", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.SECURITY_SKILLS },
        { name: "Security Policies Implementation", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.SECURITY_SKILLS },
        { name: "Data Encryption", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.SECURITY_SKILLS },
        { name: "Database Security Management", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.SECURITY_SKILLS }
      ]
    },
    {
      title: "Scripting & Automation",
      icon: Code,
      description: "Efficiency through automation",
      skills: [
        { name: "T-SQL Scripting", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.CORE_SKILLS },
        { name: "PowerShell Scripting", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.EARLY_SKILLS },
        { name: "Automated Monitoring Scripts", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.MID_SKILLS },
        { name: "Database Maintenance Automation", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.MID_SKILLS },
        { name: "Routine Task Automation", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.MID_SKILLS }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      description: "Professional database tools",
      skills: [
        { name: "SSMS & SQL Profiler", level: SKILL_LEVELS.EXPERT, startDate: SKILL_START_DATES.CORE_SKILLS },
        { name: "Performance Monitor", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.EARLY_SKILLS },
        { name: "AWS EC2 DB Hosting", level: SKILL_LEVELS.ADVANCED, startDate: '2025-09-29' },
        { name: "Azure SQL", level: SKILL_LEVELS.INTERMEDIATE, startDate: SKILL_START_DATES.CLOUD_SKILLS }
      ]
    },
    {
      title: "Soft Skills",
      icon: Users,
      description: "Professional competencies",
      skills: [
        { name: "Analytical Problem-Solving", level: SKILL_LEVELS.EXPERT, startDate: SKILL_START_DATES.CORE_SKILLS },
        { name: "Effective Communication", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.EARLY_SKILLS },
        { name: "Collaboration & Teamwork", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.EARLY_SKILLS },
        { name: "Attention to Detail", level: SKILL_LEVELS.EXPERT, startDate: SKILL_START_DATES.CORE_SKILLS }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case SKILL_LEVELS.EXPERT:
        return "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 font-mono";
      case SKILL_LEVELS.ADVANCED:
        return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0 font-mono";
      case SKILL_LEVELS.INTERMEDIATE:
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 font-mono";
      default:
        return "bg-gradient-to-r from-slate-500 to-gray-600 text-white border-0 font-mono";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case SKILL_LEVELS.EXPERT:
        return <Zap size={10} className="mr-1" />;
      case SKILL_LEVELS.ADVANCED:
        return <TrendingUp size={10} className="mr-1" />;
      default:
        return <Settings size={10} className="mr-1" />;
    }
  };

  // Recharts Data Sets
  const queryOptimizationData = [
    { name: 'Fetch Orders Query', before: 480, after: 12 },
    { name: 'Global ERP Search', before: 950, after: 24 },
    { name: 'Active Sessions Log', before: 180, after: 5 },
    { name: 'Sales Aggregate API', before: 620, after: 18 },
  ];

  const rtoReductionData = [
    { name: 'Legacy Plan (Manual)', duration: 240 },
    { name: 'New Plan (AlwaysOn AG)', duration: 15 },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Core Skills</h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto font-mono">
            Comprehensive production environment management, failover topologies, and performance optimization
          </p>
        </div>
        
        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-slate-950/40 border-slate-900 backdrop-blur-sm hover:bg-slate-950/70 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 group transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <category.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <CardTitle className="text-base font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </CardTitle>
                    <p className="text-[11px] text-slate-400 mt-0.5">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group/skill text-left">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-300 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                        <Badge className={`${getLevelColor(skill.level)} text-[9px] px-2 py-0.5 flex items-center`}>
                          {getLevelIcon(skill.level)}
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
                        <span>Experience</span>
                        <span className="text-cyan-500 font-bold">{formatExperience(skill.startDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Database Performance Metric Showroom */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
              <BarChart3 className="text-cyan-400 mr-2" size={24} />
              <span>Production Tuning Showroom</span>
            </h3>
            <p className="text-xs font-mono text-slate-400">Quantitative audit results from enterprise database optimization projects</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Query Optimization */}
            <Card className="bg-slate-950/40 border-slate-900 p-6 backdrop-blur">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="text-cyan-400" size={18} />
                <h4 className="text-sm font-bold text-white uppercase font-mono">Query Latency Optimization (Before vs After Indexing)</h4>
              </div>
              <div className="h-60 w-full font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={queryOptimizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} />
                    <YAxis label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', stroke: '#64748b', fontSize: 10 }} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: 11 }} />
                    <Bar dataKey="before" name="Before Index Tuning (ms)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="after" name="After Index Tuning (ms)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Chart 2: RTO Reduction */}
            <Card className="bg-slate-950/40 border-slate-900 p-6 backdrop-blur">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="text-purple-400" size={18} />
                <h4 className="text-sm font-bold text-white uppercase font-mono">Disaster Recovery RTO (Recovery Time Objective)</h4>
              </div>
              <div className="h-60 w-full font-mono text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rtoReductionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} />
                    <YAxis label={{ value: 'RTO (Minutes)', angle: -90, position: 'insideLeft', stroke: '#64748b', fontSize: 10 }} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: 11 }} />
                    <Bar dataKey="duration" name="RTO Duration (Minutes)" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};