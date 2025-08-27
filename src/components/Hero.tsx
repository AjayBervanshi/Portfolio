
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Linkedin } from "lucide-react";
import { ProfileAvatar } from "@/components/ProfileAvatar";

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

  // Calculate years of experience dynamically from July 4, 2022
  const calculateExperience = () => {
    const startDate = new Date('2022-07-04');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    return diffYears;
  };

  const yearsOfExperience = calculateExperience();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile Avatar with tech effects */}
        <div className="mb-8 relative flex justify-center items-center">
          <ProfileAvatar size="lg" priority className="flex-shrink-0" />
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-cyan-400/30 animate-spin" style={{animationDuration: '10s'}}></div>
        </div>

        {/* Main Title with tech styling */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in drop-shadow-2xl">
          Ajay Bervanshi
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6 font-light animate-fade-in bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          MS SQL Server Database Administrator
        </h2>

        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          {yearsOfExperience}+ years of expertise in SQL Server management, performance optimization, 
          high availability solutions, and database security for critical banking applications.
        </p>

        {/* Action Buttons with enhanced tech styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            onClick={handleLinkedInClick}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-150 hover:scale-105 border border-cyan-400/30"
          >
            <Linkedin className="mr-2" size={20} />
            Connect on LinkedIn
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleScrollToContact}
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-150 hover:scale-105 backdrop-blur-sm"
          >
            <ExternalLink className="mr-2" size={20} />
            Contact Me
          </Button>
        </div>

        {/* Location with tech styling */}
        <p className="text-sm text-slate-400 mt-6 animate-fade-in">
          📍 Nagpur, Maharashtra, India
        </p>
      </div>
    </section>
  );
};
