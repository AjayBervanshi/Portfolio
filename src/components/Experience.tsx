
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building, TrendingUp } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "MS SQL Server Database Administrator",
      company: "Wipro Limited",
      duration: "Jan 2023 - Present",
      period: "1 year 11 months",
      location: "Remote, India",
      type: "Full-time",
      responsibilities: [
        "Managed and maintained SQL Server instances across multiple environments (Dev, Test, UAT, Production)",
        "Implemented high availability solutions using AlwaysOn Availability Groups and Failover Clustering",
        "Optimized database performance through index tuning, query optimization, and resource monitoring",
        "Automated backup and recovery processes, reducing manual intervention by 85%",
        "Developed PowerShell scripts for routine maintenance tasks and monitoring",
        "Implemented security best practices including TDE, Always Encrypted, and audit policies",
        "Collaborated with development teams for database design and performance troubleshooting",
        "Reduced average query response time by 40% through performance tuning initiatives"
      ],
      technologies: ["SQL Server 2019", "T-SQL", "PowerShell", "SSMS", "Azure Data Studio", "SSIS", "SSRS"],
      achievements: [
        "Reduced database downtime by 95% through proactive monitoring",
        "Improved backup efficiency by 60% using compression and optimization",
        "Successfully migrated 15+ databases to newer SQL Server versions"
      ]
    },
    {
      title: "Database Administrator (Junior)",
      company: "Wipro Limited",
      duration: "Jul 2021 - Dec 2022",
      period: "1 year 6 months",
      location: "Pune, India",
      type: "Full-time",
      responsibilities: [
        "Assisted senior DBAs in daily database maintenance and monitoring activities",
        "Performed database backups, restores, and basic troubleshooting",
        "Monitored database performance and generated reports on system health",
        "Participated in database migration and upgrade projects",
        "Created and maintained documentation for database procedures",
        "Supported development teams with database-related queries and issues"
      ],
      technologies: ["SQL Server 2016/2017", "T-SQL", "SSMS", "Windows Server"],
      achievements: [
        "Completed SQL Server certification training",
        "Automated 10+ routine maintenance tasks",
        "Maintained 99.5% database uptime during tenure"
      ]
    },
    {
      title: "Frontend Web Developer (Intern)",
      company: "Sukhiasoft Solutions",
      duration: "Oct 2020 - Apr 2021",
      period: "6 months",
      location: "Remote, India",
      type: "Internship",
      responsibilities: [
        "Developed responsive web interfaces using HTML5, CSS3, and JavaScript",
        "Created dynamic content management system interfaces",
        "Integrated frontend applications with backend databases",
        "Collaborated with design team to implement UI/UX requirements",
        "Performed cross-browser testing and optimization",
        "Maintained code documentation and version control using Git"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git", "MySQL"],
      achievements: [
        "Successfully delivered 5+ web projects",
        "Improved website loading speed by 30%",
        "Received positive feedback for code quality and delivery"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-green-600";
      case "Internship":
        return "bg-blue-600";
      default:
        return "bg-slate-600";
    }
  };

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Professional Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="border-b border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-semibold text-white">
                        {exp.title}
                      </CardTitle>
                      <Badge className={`${getTypeColor(exp.type)} text-white text-xs`}>
                        {exp.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building size={16} className="text-cyan-400" />
                      <p className="text-cyan-400 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-2 text-slate-300">
                      <CalendarDays size={16} className="mr-2" />
                      <div>
                        <span className="block">{exp.duration}</span>
                        <span className="text-sm text-slate-400">({exp.period})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end text-slate-300">
                      <MapPin size={16} className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Responsibilities */}
                  <div className="lg:col-span-2">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <TrendingUp size={18} className="mr-2 text-cyan-400" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex} className="text-slate-300 flex items-start">
                          <span className="text-cyan-400 mr-2 mt-1">•</span>
                          <span className="text-sm leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies & Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-slate-300 flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
