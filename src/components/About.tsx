
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail, Linkedin, Award, Target, Phone } from "lucide-react";
import { PERSONAL_INFO } from "@/utils/constants";
import { calculateExperience } from "@/utils/dateUtils";
import { openLinkedIn } from "@/utils/navigation";

export const About = () => {
  const yearsOfExperience = calculateExperience();

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main About Card */}
          <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm hover:bg-slate-800/90 transition-all duration-150 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Award className="text-cyan-400 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-white">Professional Summary</h3>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                I am an MS SQL Server Database Administrator with over {yearsOfExperience} years of experience specializing 
                in database management, performance optimization, and security. My core competencies include 
                query optimization, backup and recovery strategies, database security management, and 
                automation using T-SQL and PowerShell.
              </p>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                I have successfully implemented high availability and disaster recovery solutions, 
                collaborated with development teams to optimize database structures, and resolved 
                complex performance issues. Known for my problem-solving skills, attention to detail, 
                and proactive approach, I strive consistently to enhance operational efficiency.
              </p>

              <div className="flex items-center mb-4">
                <Target className="text-cyan-400 mr-3" size={20} />
                <h4 className="text-lg font-semibold text-white">Career Goal</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                My career goal is to continue growing as a database administrator, driving innovation 
                and automation to support organizational success while ensuring data integrity and availability.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="bg-slate-800/80 border-slate-700 backdrop-blur-sm hover:bg-slate-800/90 transition-all duration-150 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p>{PERSONAL_INFO.LOCATION}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Calendar className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Experience</p>
                    <p>{yearsOfExperience}+ Years in Database Administration</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="break-all">{PERSONAL_INFO.EMAIL}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p>{PERSONAL_INFO.PHONE}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-300">
                  <Linkedin className="text-cyan-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <button 
                      onClick={openLinkedIn}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Professional Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-600">
                <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>• 99.9% uptime for critical banking applications</li>
                  <li>• 20% improvement in query performance</li>
                  <li>• 25% reduction in recovery time</li>
                  <li>• 40% automation of maintenance tasks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
