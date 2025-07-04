
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar } from "lucide-react";

export const Education = () => {
  const education = [
    {
      degree: "Master of Technology in Computer Science",
      institution: "G H Raisoni College of Engineering and Management, Pune",
      duration: "2019 - Present",
      grade: "8th Sem"
    },
    {
      degree: "Bachelor of Computer Application",
      institution: "Shri Shivaji Mahavidyalaya, Nagpur",
      duration: "2016 - 2019",
      grade: "First class"
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={32} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4 leading-tight">
                  {edu.degree}
                </h3>
                
                <p className="text-cyan-400 mb-4 font-medium">
                  {edu.institution}
                </p>
                
                <div className="flex items-center justify-center text-slate-300 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{edu.duration}</span>
                </div>
                
                <p className="text-slate-400">
                  {edu.grade}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
