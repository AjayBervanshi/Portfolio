import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Linkedin, Database, Server, BarChart3 } from "lucide-react";
import { ProfileAvatar } from "@/components/ProfileAvatar";

export const ProfileCard = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <ProfileAvatar size="lg" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">Ajay Bervanshi</h1>
        <p className="text-cyan-400 text-lg font-medium mb-3">MS SQL Database Administrator</p>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <Badge variant="secondary" className="bg-slate-700/50 text-cyan-300 border-cyan-400/30">
            <Database className="w-3 h-3 mr-1" />
            SQL Server
          </Badge>
          <Badge variant="secondary" className="bg-slate-700/50 text-cyan-300 border-cyan-400/30">
            <Server className="w-3 h-3 mr-1" />
            Database Design
          </Badge>
          <Badge variant="secondary" className="bg-slate-700/50 text-cyan-300 border-cyan-400/30">
            <BarChart3 className="w-3 h-3 mr-1" />
            Performance Tuning
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-3 text-slate-300 p-2 bg-slate-700/30 rounded-lg">
          <MapPin className="text-cyan-400 flex-shrink-0" size={16} />
          <span className="text-sm">Nagpur, Maharashtra, India</span>
        </div>
        
        <div className="flex items-center space-x-3 text-slate-300 p-2 bg-slate-700/30 rounded-lg">
          <Mail className="text-cyan-400 flex-shrink-0" size={16} />
          <a 
            href="mailto:ajay.bervanshi@gmail.com" 
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ajay.bervanshi@gmail.com
          </a>
        </div>
        
        <div className="flex items-center space-x-3 text-slate-300 p-2 bg-slate-700/30 rounded-lg">
          <Phone className="text-cyan-400 flex-shrink-0" size={16} />
          <a 
            href="tel:+917620085260" 
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            +91 7620 085260
          </a>
        </div>
        
        <div className="flex items-center space-x-3 text-slate-300 p-2 bg-slate-700/30 rounded-lg">
          <Linkedin className="text-cyan-400 flex-shrink-0" size={16} />
          <a 
            href="https://www.linkedin.com/in/ajay-bervanshi" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            LinkedIn Profile
          </a>
        </div>
      </CardContent>
    </Card>
  );
};