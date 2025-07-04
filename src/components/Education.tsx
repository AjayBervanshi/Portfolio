
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

export const Education = () => {
  const education = [
    {
      degree: "Master of Technology in Computer Science",
      institution: "G H Raisoni College of Engineering and Management",
      location: "Pune, Maharashtra",
      duration: "2019 - 2024",
      status: "Final Year (8th Semester)",
      grade: "CGPA: 8.2/10",
      specialization: "Database Systems & Data Analytics",
      relevantCourses: [
        "Advanced Database Management Systems",
        "Data Mining & Warehousing",
        "Distributed Database Systems",
        "Database Security",
        "Big Data Analytics",
        "Cloud Computing"
      ],
      projects: [
        "Performance Optimization of Large-Scale Database Systems",
        "Implementation of High Availability Solutions for Enterprise Databases"
      ]
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Shri Shivaji Mahavidyalaya",
      location: "Nagpur, Maharashtra",
      duration: "2016 - 2019",
      status: "Completed",
      grade: "First Class (72%)",
      specialization: "Computer Applications & Programming",
      relevantCourses: [
        "Database Management Systems",
        "Programming in C/C++",
        "Java Programming",
        "Web Technologies",
        "Software Engineering",
        "Computer Networks"
      ],
      projects: [
        "Student Management System using MySQL",
        "Library Management System with Web Interface"
      ]
    }
  ];

  const certifications = [
    {
      name: "Microsoft Certified: Azure Database Administrator Associate",
      issuer: "Microsoft",
      year: "2023",
      status: "In Progress"
    },
    {
      name: "SQL Server Performance Tuning",
      issuer: "Pluralsight",
      year: "2022",
      status: "Completed"
    },
    {
      name: "PowerShell for SQL Server DBAs",
      issuer: "SQLSkills",
      year: "2022",
      status: "Completed"
    }
  ];

  return (
    <section id="education" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Education & Certifications</h2>
        
        {/* Education */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-cyan-400 mb-8 flex items-center">
            <GraduationCap size={24} className="mr-3" />
            Academic Qualifications
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap size={32} className="text-white" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mb-4 text-center leading-tight">
                    {edu.degree}
                  </h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center text-cyan-400">
                      <BookOpen size={16} className="mr-2" />
                      <span className="font-medium">{edu.institution}</span>
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

                  <div className="mb-4">
                    <h5 className="text-white font-medium mb-2">Relevant Courses:</h5>
                    <div className="flex flex-wrap gap-1">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <span key={courseIndex} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">Key Projects:</h5>
                    <ul className="space-y-1">
                      {edu.projects.map((project, projIndex) => (
                        <li key={projIndex} className="text-slate-300 text-sm flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-8 flex items-center">
            <Award size={24} className="mr-3" />
            Professional Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  
                  <h4 className="text-white font-semibold mb-2 text-sm leading-tight">
                    {cert.name}
                  </h4>
                  
                  <p className="text-cyan-400 mb-2 text-sm">{cert.issuer}</p>
                  <p className="text-slate-300 text-sm mb-3">{cert.year}</p>
                  
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    cert.status === 'Completed' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {cert.status}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
