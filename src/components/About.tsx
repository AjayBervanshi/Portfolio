
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail, Linkedin, Award, Target } from "lucide-react";

export const About = () => {
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/ajay-bervanshi", "_blank");
  };

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main About Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Award className="text-cyan-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Professional Summary</h3>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Passionate MS SQL Server Database Administrator with over 3 years of hands-on experience 
                in enterprise database management. Currently pursuing M.Tech in Computer Science while 
                working full-time at Wipro Limited.
              </p>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Specialized in database performance optimization, implementing high availability solutions, 
                disaster recovery planning, and automating routine database maintenance tasks using T-SQL 
                and PowerShell scripting.
              </p>

              <div className="flex items-center mb-4">
                <Target className="text-cyan-400 mr-3" size={20} />
                <h4 className="text-lg font-semibold text-white">Core Expertise</h4>
              </div>
              <ul className="text-slate-300 space-y-2">
                <li>• SQL Server Administration (2016, 2017, 2019, 2022)</li>
                <li>• Performance Tuning & Query Optimization</li>
                <li>• High Availability & Disaster Recovery (AlwaysOn, Clustering)</li>
                <li>• Database Security & Compliance</li>
                <li>• Automation with T-SQL & PowerShell</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Nagpur, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Calendar className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p>3+ Years in Database Administration</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="break-all">ajaybervanshi@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Linkedin className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <button 
                      onClick={handleLinkedInClick}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Professional Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Current Focus</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Currently expanding expertise in cloud database solutions, Azure SQL Database, 
                  and exploring modern data platform architectures while completing my Master's degree.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
