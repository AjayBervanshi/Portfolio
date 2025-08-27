
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

export const Education = () => {
  const education = [
    {
      degree: "Master of Technology in Computer Science",
      institution: "Birla Institute of Technology and Science, Pilani",
      location: "Pilani, Rajasthan",
      duration: "Pursuing",
      status: "Currently Enrolled",
      grade: "In Progress",
      specialization: "Computer Science & Engineering",
      relevantCourses: [
        "Advanced Database Management Systems",
        "Data Structures and Algorithms",
        "Computer Networks",
        "Software Engineering",
        "Distributed Systems",
        "Database Security"
      ]
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "G. H. Raisoni Institute Of Information Technology",
      location: "Nagpur, Maharashtra",
      duration: "Completed May 2022",
      status: "Completed",
      grade: "GPA: 8.2/10",
      specialization: "Computer Applications & Programming",
      relevantCourses: [
        "Database Management Systems",
        "Programming in C/C++",
        "Java Programming",
        "Web Technologies",
        "Software Engineering",
        "Computer Networks"
      ]
    }
  ];

  return (
    <section id="education" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Education</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-150 hover:shadow-xl group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
                  <GraduationCap size={32} className="text-white" />
                </div>
                
                <h4 className="text-xl font-semibold text-white mb-4 text-center leading-tight">
                  {edu.degree}
                </h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center text-cyan-400">
                    <BookOpen size={16} className="mr-2" />
                    <span className="font-medium text-center">{edu.institution}</span>
                  </div>
                  
                  <div className="flex items-center justify-center text-slate-300">
                    <MapPin size={16} className="mr-2" />
                    <span>{edu.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center text-slate-300">
                    <Calendar size={16} className="mr-2" />
                    <span>{edu.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-center text-slate-300">
                    <Award size={16} className="mr-2" />
                    <span>{edu.grade}</span>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">
                    {edu.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h5 className="text-white font-medium mb-2">Specialization:</h5>
                  <p className="text-slate-300 text-sm">{edu.specialization}</p>
                </div>

                <div>
                  <h5 className="text-white font-medium mb-2">Relevant Courses:</h5>
                  <div className="flex flex-wrap gap-1">
                    {edu.relevantCourses.map((course, courseIndex) => (
                      <span key={courseIndex} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        {course}
                      </span>
                    ))}
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
