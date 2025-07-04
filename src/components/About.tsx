
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail, Linkedin } from "lucide-react";

export const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
        
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8">
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              I am an MS SQL Server Database Administrator with over 3 years of experience specializing in database 
              management, performance optimization, backup and recovery, and automation. I am currently working 
              on new topics related to: supporting different SQL architectures.
            </p>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              My skills encompass SQL Server Administration OLTP/OLAP, Reports, SSIS/R database clustering, 
              replication, mirroring PowerShell scripting, security and compliance and analytical performance 
              improvement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="text-cyan-400" size={20} />
                <span>Nagpur, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Calendar className="text-cyan-400" size={20} />
                <span>3+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="text-cyan-400" size={20} />
                <span>ajaybervanshi@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Linkedin className="text-cyan-400" size={20} />
                <span>Ajay's Profile</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
