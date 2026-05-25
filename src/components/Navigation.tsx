import { useState, useEffect } from "react";
import { Menu, X, Database, Terminal, Briefcase, Mail, Home } from "lucide-react";
import { PERSONAL_INFO } from "@/utils/constants";
import { scrollToSection } from "@/utils/navigation";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "operations-center", label: "Ops Center", icon: Terminal },
    { id: "experience", label: "Chronicles", icon: Briefcase },
    { id: "contact", label: "Connection Desk", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

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

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b-[0.5px] border-cyan-500/25 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Database size={15} className="text-white animate-pulse" />
            </div>
            <div className="text-sm font-mono font-black uppercase tracking-widest bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {PERSONAL_INFO.NAME}
            </div>
          </div>

          {/* Sync status directly in navbar (wow touch!) */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800 text-[10px] font-mono text-slate-400 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>AG REPLICAS: NAGPUR ⇄ PUNE ⇄ AWS</span>
            <span className="text-emerald-400 font-bold">SYNCED</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={`group relative px-4 py-2 rounded-xl transition-all duration-200 hover:bg-slate-900/60 font-mono text-xs uppercase tracking-wider ${
                  activeSection === item.id 
                    ? "bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20" 
                    : "text-slate-400 hover:text-cyan-400"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <item.icon size={13} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Menu button */}
          <button
            className="md:hidden p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={18} className="text-cyan-400" />
            ) : (
              <Menu size={18} className="text-cyan-400" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-900 bg-slate-950/98 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.id)}
                  className={`group flex items-center gap-2 p-3.5 rounded-xl transition-all duration-150 font-mono text-[10px] uppercase tracking-wider ${
                    activeSection === item.id 
                      ? "bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20" 
                      : "text-slate-400 hover:text-cyan-400 hover:bg-slate-900/40"
                  }`}
                >
                  <item.icon size={14} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};