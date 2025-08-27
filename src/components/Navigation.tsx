import { useState, useEffect } from "react";
import { Menu, X, Database, User, Briefcase, GraduationCap, Mail, Home } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Database },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Database size={20} className="text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Ajay Bervanshi
            </div>
          </div>

          {/* Right side container for menus */}
          <div>
            {/* Enhanced Desktop Menu */}
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-800/80 hover:scale-105 ${
                    activeSection === item.id 
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon size={16} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-150"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X size={24} className="text-cyan-400" />
              ) : (
                <Menu size={24} className="text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-cyan-500/30 bg-slate-900/98 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center space-x-3 p-4 rounded-lg transition-all duration-150 hover:bg-slate-800/80 ${
                    activeSection === item.id 
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  <item.icon size={18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};