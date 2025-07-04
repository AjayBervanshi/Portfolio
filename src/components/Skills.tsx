
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Shield, Code, Settings, Users } from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Database Management",
      icon: Database,
      skills: [
        { name: "SQL Server Administration (2016/2019/2022)", level: "Expert" },
        { name: "T-SQL Development", level: "Expert" },
        { name: "Database Performance Tuning", level: "Advanced" },
        { name: "Query Optimization", level: "Advanced" },
        { name: "Backup & Recovery Planning", level: "Expert" },
        { name: "Database Health Monitoring", level: "Advanced" }
      ]
    },
    {
      title: "High Availability & DR",
      icon: Server,
      skills: [
        { name: "Database Clustering", level: "Advanced" },
        { name: "Database Replication", level: "Advanced" },
        { name: "Database Mirroring", level: "Advanced" },
        { name: "Disaster Recovery Planning", level: "Advanced" },
        { name: "Failover Processes", level: "Advanced" },
        { name: "HA/DR Solutions", level: "Advanced" }
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      skills: [
        { name: "User Authentication & Access Control", level: "Advanced" },
        { name: "Security Policies Implementation", level: "Advanced" },
        { name: "Data Encryption", level: "Advanced" },
        { name: "GDPR Compliance", level: "Advanced" },
        { name: "PCI DSS Compliance", level: "Advanced" },
        { name: "Database Security Management", level: "Advanced" }
      ]
    },
    {
      title: "Scripting & Automation",
      icon: Code,
      skills: [
        { name: "T-SQL Scripting", level: "Expert" },
        { name: "PowerShell Scripting", level: "Advanced" },
        { name: "Automated Monitoring Scripts", level: "Advanced" },
        { name: "Database Maintenance Automation", level: "Advanced" },
        { name: "Routine Task Automation", level: "Advanced" }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      skills: [
        { name: "SQL Server Management Studio (SSMS)", level: "Expert" },
        { name: "SQL Profiler", level: "Advanced" },
        { name: "Performance Monitor", level: "Advanced" },
        { name: "Azure SQL", level: "Intermediate" }
      ]
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: [
        { name: "Analytical Problem-Solving", level: "Expert" },
        { name: "Effective Communication", level: "Advanced" },
        { name: "Collaboration & Teamwork", level: "Advanced" },
        { name: "Attention to Detail", level: "Expert" }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "Advanced":
        return "bg-blue-600 hover:bg-blue-700 text-white";
      case "Intermediate":
        return "bg-yellow-600 hover:bg-yellow-700 text-white";
      case "Beginner":
        return "bg-orange-600 hover:bg-orange-700 text-white";
      default:
        return "bg-slate-600 hover:bg-slate-700 text-white";
    }
  };

  return (
    <section id="skills" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <category.icon size={20} className="text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-cyan-400">
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      className={`${getLevelColor(skill.level)} border-0 transition-all duration-300 hover:scale-105 text-xs`}
                      title={`${skill.name} - ${skill.level} Level`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skill Level Legend */}
        <div className="mt-12 flex justify-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-3 text-center">Skill Levels</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-green-600 text-white">Expert</Badge>
              <Badge className="bg-blue-600 text-white">Advanced</Badge>
              <Badge className="bg-yellow-600 text-white">Intermediate</Badge>
              <Badge className="bg-orange-600 text-white">Beginner</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
