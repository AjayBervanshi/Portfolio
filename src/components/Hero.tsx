
import { Button } from "@/components/ui/button";
import { User, Download, ExternalLink, Linkedin } from "lucide-react";

export const Hero = () => {
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/ajay-bervanshi", "_blank");
  };

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume-ajay-bervanshi.pdf';
    link.download = 'Ajay_Bervanshi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      console.log("Resume download initiated. Please ensure resume-ajay-bervanshi.pdf is in the public folder.");
    }, 100);
  };

  // Calculate years of experience from July 4, 2022
  const startDate = new Date('2022-07-04');
  const currentDate = new Date();
  const yearsOfExperience = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating squares */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-cyan-400/20 rotate-45 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-yellow-400/30 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-purple-400/25 rotate-45 animate-ping"></div>
        
        {/* Floating circles */}
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 right-10 w-8 h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating triangles (using borders) */}
        <div className="absolute top-40 left-1/3 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-cyan-400/30 animate-spin" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400/25 animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        {/* Border-only shapes */}
        <div className="absolute top-20 right-32 w-16 h-16 border-2 border-cyan-400/30 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Moving dots */}
        <div className="absolute top-60 left-1/2 w-3 h-3 bg-yellow-400/40 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-80 right-40 w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
        
        {/* SQL Server Logo Area */}
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
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-yellow-400/30 animate-spin" style={{animationDuration: '10s'}}></div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
          Ajay Bervanshi
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6 font-light animate-fade-in">
          MS SQL Server Database Administrator
        </h2>

        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          {yearsOfExperience}+ years of expertise in SQL Server management, performance optimization, 
          high availability solutions, and database security for critical banking applications.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            onClick={handleLinkedInClick}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="mr-2" size={20} />
            Connect on LinkedIn
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleScrollToContact}
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <ExternalLink className="mr-2" size={20} />
            Contact Me
          </Button>
        </div>

        {/* Location */}
        <p className="text-sm text-slate-400 mt-6 animate-fade-in">
          📍 Airoli, Mumbai, Maharashtra, India
        </p>
      </div>
    </section>
  );
};
