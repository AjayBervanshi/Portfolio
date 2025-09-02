import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Shield, Code, Settings, Users, Zap, TrendingUp } from "lucide-react";
import { SKILL_START_DATES, SKILL_LEVELS } from "@/utils/constants";
import { formatExperience } from "@/utils/dateUtils";

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
        { name: "HA/DR Solutions", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.ADVANCED_SKILLS }
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Data protection and regulatory compliance",
      skills: [
        { name: "User Authentication & Access Control", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.SECURITY_SKILLS },
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
        { name: "SQL Server Management Studio (SSMS)", level: SKILL_LEVELS.EXPERT, startDate: SKILL_START_DATES.CORE_SKILLS },
        { name: "SQL Profiler", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.EARLY_SKILLS },
        { name: "Performance Monitor", level: SKILL_LEVELS.ADVANCED, startDate: SKILL_START_DATES.EARLY_SKILLS },
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
        return "bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0";
      case SKILL_LEVELS.ADVANCED:
        return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0";
      case SKILL_LEVELS.INTERMEDIATE:
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0";
      case SKILL_LEVELS.BEGINNER:
        return "bg-gradient-to-r from-red-500 to-pink-600 text-white border-0";
      default:
        return "bg-gradient-to-r from-slate-500 to-gray-600 text-white border-0";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case SKILL_LEVELS.EXPERT:
        return <Zap size={12} className="mr-1" />;
      case SKILL_LEVELS.ADVANCED:
        return <TrendingUp size={12} className="mr-1" />;
      case SKILL_LEVELS.INTERMEDIATE:
        return <Settings size={12} className="mr-1" />;
      case SKILL_LEVELS.BEGINNER:
        return <Users size={12} className="mr-1" />;
      default:
        return <Settings size={12} className="mr-1" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Comprehensive expertise in database administration, performance optimization, and enterprise solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-slate-800/80 border-slate-700 backdrop-blur-sm hover:bg-slate-800/90 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group transform hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <category.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </CardTitle>
                    <p className="text-sm text-slate-400 mt-1">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group/skill">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-300 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                        <Badge className={`${getLevelColor(skill.level)} text-xs px-2 py-1 flex items-center`}>
                          {getLevelIcon(skill.level)}
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Experience</span>
                        <span className="text-cyan-400 font-medium">{formatExperience(skill.startDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Skill Level Legend */}
        <div className="mt-16 flex justify-center">
          <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 text-center text-lg">Skill Proficiency Levels</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white mb-2">Expert</Badge>
                  <p className="text-xs text-slate-400">{formatExperience(SKILL_START_DATES.CORE_SKILLS)}</p>
                </div>
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white mb-2">Advanced</Badge>
                  <p className="text-xs text-slate-400">{formatExperience(SKILL_START_DATES.MID_SKILLS)}</p>
                </div>
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-2">Intermediate</Badge>
                  <p className="text-xs text-slate-400">{formatExperience(SKILL_START_DATES.CLOUD_SKILLS)}</p>
                </div>
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white mb-2">Beginner</Badge>
                  <p className="text-xs text-slate-400">Learning phase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};