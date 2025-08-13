
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building, TrendingUp } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "MS SQL Database Administrator",
      company: "Wipro Limited",
      duration: "July 2022 - Present",
      period: "3+ years",
      location: "Remote, India",
      type: "Full-time",
      responsibilities: [
        "Administered and maintained MS SQL Server databases, ensuring 99.9% uptime for critical banking applications",
        "Monitored database performance, identified bottlenecks, and implemented optimization techniques to enhance efficiency",
        "Implemented database replication, clustering, and mirroring for high availability and disaster recovery",
        "Conducted quarterly disaster recovery drills to validate backup and failover processes, ensuring data recoverability",
        "Managed database security, including user accounts and permissions, to protect sensitive data and maintain compliance",
        "Collaborated with development teams to align database configurations with application performance needs",
        "Developed and maintained scripts using PowerShell for automation of routine tasks and database monitoring"
      ],
      technologies: ["SQL Server 2016/2019/2022", "T-SQL", "PowerShell", "SSMS", "SQL Profiler", "Performance Monitor"],
      achievements: [
        "Enhanced query performance by 20% through indexing and optimization strategies",
        "Reduced recovery time by 25% by streamlining backup and failover processes",
        "Automated 40% of maintenance tasks using PowerShell scripting, saving significant manual effort",
        "Identified and resolved capacity issues, leading to improved system responsiveness"
      ]
    },
    {
      title: "Front End Web Developer - Intern",
      company: "Sankalpsoft Solution",
      duration: "September 2021 - October 2021",
      period: "2 months",
      location: "Remote, India",
      type: "Internship",
      responsibilities: [
        "Designed a user-friendly dynamic web interface for a café, enhancing customer interaction",
        "Developed a digital business card using HTML and CSS, showcasing a modern and professional design",
        "Built a secure blood donation camp registration form with database integration for efficient data management"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Database Integration"],
      achievements: [
        "Successfully delivered user-friendly web interfaces",
        "Created responsive and modern designs",
        "Implemented secure database integration"
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
