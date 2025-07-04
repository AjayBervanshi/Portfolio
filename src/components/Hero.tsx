
import { Button } from "@/components/ui/button";
import { User, Download, ExternalLink, Linkedin } from "lucide-react";

export const Hero = () => {
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/ajay-bervanshi", "_blank");
  };

  const handleDownloadResume = () => {
    // You can replace this with actual resume download logic
    console.log("Download resume");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-16">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-yellow-400/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-cyan-400/30 rotate-12 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-purple-400/30 rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-yellow-400/20 rotate-45"></div>
        <div className="absolute bottom-1/3 right-10 w-12 h-12 bg-cyan-400/20 rotate-12"></div>
        
        {/* Microsoft SQL Server Logo Area */}
        <div className="absolute top-32 right-32 opacity-10">
          <div className="text-6xl font-bold text-white/20">SQL</div>
          <div className="text-2xl text-white/20">Server</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile Avatar */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-slate-700 rounded-full flex items-center justify-center border-4 border-cyan-400/50 shadow-2xl">
            <User size={48} className="text-cyan-400" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-yellow-400/30 animate-spin"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
          Ajay Bervanshi
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6 font-light animate-fade-in">
          MS SQL Server Database Administrator
        </h2>

        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Experienced Database Administrator with 3+ years of expertise in SQL Server management, 
          performance optimization, high availability solutions, and database security for critical banking applications.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            onClick={handleDownloadResume}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Download className="mr-2" size={20} />
            Download Resume
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLinkedInClick}
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="mr-2" size={20} />
            LinkedIn Profile
          </Button>
        </div>
      </div>
    </section>
  );
};
