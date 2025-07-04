
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "MS SQL Database Administrator",
      company: "Wipro Limited",
      duration: "1.6 Years - Present",
      location: "Remote",
      responsibilities: [
        "Performance SQL Server start-up to go-to for learning DBMS.",
        "Streamlined MSSQL clustering, mirroring production",
        "A combined 95% of maintenance tasks using PowerShell",
        "Reduced query performance by 30%",
        "Secured recovery time by 40%"
      ]
    },
    {
      title: "Front End Web Developer (Intern)",
      company: "Sukhiasoft Solutions",
      duration: "6 Months - Apr 2021",
      location: "Remote",
      responsibilities: [
        "Designed dynamic CMS platforms using HTML/CSS",
        "Built responsive layout",
        "Created database integrated frontend Web UI as well"
      ]
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="border-b border-slate-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-white mb-2">
                      {exp.title}
                    </CardTitle>
                    <p className="text-cyan-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="flex items-center justify-end mb-2 text-slate-300">
                      <CalendarDays size={16} className="mr-2" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center justify-end text-slate-300">
                      <MapPin size={16} className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex} className="text-slate-300 flex items-start">
                      <span className="text-cyan-400 mr-2">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
