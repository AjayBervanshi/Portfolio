
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Database Management",
      skills: [
        { name: "SQL Server Administration", level: "Expert" },
        { name: "T-SQL", level: "Expert" },
        { name: "Backup & Recovery", level: "Advanced" },
        { name: "Performance Tuning", level: "Advanced" },
        { name: "Query Optimization", level: "Advanced" }
      ]
    },
    {
      title: "High Availability",
      skills: [
        { name: "Clustering", level: "Advanced" },
        { name: "Mirroring", level: "Advanced" },
        { name: "Replication", level: "Intermediate" },
        { name: "AlwaysOn", level: "Advanced" }
      ]
    },
    {
      title: "Scripting & Automation",
      skills: [
        { name: "T-SQL", level: "Expert" },
        { name: "PowerShell", level: "Advanced" },
        { name: "Monitoring Scripts", level: "Advanced" }
      ]
    },
    {
      title: "Tools & Security",
      skills: [
        { name: "SQL Server", level: "Expert" },
        { name: "Azure SQL", level: "Intermediate" },
        { name: "SSMS", level: "Expert" },
        { name: "SSIS & SSRS", level: "Advanced" }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-600 hover:bg-green-700";
      case "Advanced":
        return "bg-blue-600 hover:bg-blue-700";
      case "Intermediate":
        return "bg-yellow-600 hover:bg-yellow-700";
      default:
        return "bg-slate-600 hover:bg-slate-700";
    }
  };

  return (
    <section className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-cyan-400">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      className={`${getLevelColor(skill.level)} text-white border-0 transition-all duration-300 hover:scale-105`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
