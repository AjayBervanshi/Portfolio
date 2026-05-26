import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Linkedin, Database, Terminal, Shield, Terminal as TerminalIcon } from "lucide-react";
import { PERSONAL_INFO } from "@/utils/constants";
import { calculateExperience } from "@/utils/dateUtils";
import { openLinkedIn, scrollToContact } from "@/utils/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Hero = () => {
  const yearsOfExperience = calculateExperience();
  const [bootText, setBootText] = useState<string[]>([]);

  // Simulated cyber system boot logger in Hero
  useEffect(() => {
    const logs = [
      "SYSTEM DECK BOOTED...",
      "CATALOG IDENTIFIED: AjayPortfolioDB (5.5 TB)",
      "CLUSTER STATUS: Nagpur Primary ⇄ Pune Secondary (SYNCED)",
      "DISASTER RECOVERY THRESHOLD: LSN ALIGNED [OK]",
      "VISITOR ACCESS GRANTED: ACTIVE"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < logs.length) {
        setBootText(prev => [...prev, logs[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const scrollToOps = () => {
    const element = document.getElementById("operations-center");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 pt-20 pb-12">
      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left side text deck (7/12 Width) */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-slate-950/80 border-[0.5px] border-cyan-500/20 px-4 py-1.5 rounded-full text-[10px] font-mono text-cyan-400 shadow-md shadow-cyan-500/5 backdrop-blur-md"
          >
            <Database size={12} className="animate-pulse" />
            <span className="font-black tracking-widest uppercase">Senior SQL Database Administrator</span>
            <span className="text-slate-700">|</span>
            <Shield size={12} className="text-purple-400" />
            <span className="text-purple-400 font-bold uppercase tracking-widest">DR Ops</span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl leading-none uppercase">
              AJAY BERVANSHI
            </h1>
            <h2 className="text-xl md:text-2xl font-black text-cyan-400 font-mono tracking-wide uppercase">
              Production Database Operations Commander
            </h2>
          </motion.div>

          <motion.p
            className="text-slate-300 text-sm md:text-base leading-relaxed font-sans max-w-xl"
            variants={itemVariants}
          >
            Senior MS SQL Server DBA with over {yearsOfExperience} years of experience specializing in high-performance clustering, backup disaster recovery plans, automated powershell tooling, and highly robust cloud hostings to guarantee complete database accessibility.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              onClick={scrollToOps}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-mono text-xs uppercase tracking-wider font-extrabold px-6 py-5 rounded-xl shadow-lg border border-cyan-400/20 transition-all hover:scale-105"
            >
              <Terminal className="mr-2" size={14} />
              Command Center
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              onClick={openLinkedIn}
              className="border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-cyan-400 font-mono text-xs uppercase tracking-wider font-extrabold px-6 py-5 rounded-xl transition-all hover:scale-105 backdrop-blur-md"
            >
              <Linkedin className="mr-2 text-cyan-400" size={14} />
              LinkedIn Profile
            </Button>
          </motion.div>
        </div>

        {/* Right side interactive visual logs terminal (5/12 Width) */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            variants={itemVariants}
            className="bg-slate-950/85 border-[0.5px] border-cyan-500/20 backdrop-blur-md rounded-3xl p-5 shadow-2xl relative overflow-hidden group w-full text-left"
          >
            {/* Corner ambient purple glow */}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-300" />
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-900 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">SQL_REPL_AGENT</span>
            </div>

            {/* Typewriter logs stream */}
            <div className="font-mono text-[10px] text-slate-400 space-y-2.5 min-h-[140px] leading-relaxed select-none">
              {bootText.filter(Boolean).map((txt, i) => (
                <div key={i} className="flex items-start gap-1">
                  <span className="text-cyan-400 font-extrabold flex-shrink-0">&gt;</span>
                  <span className={txt?.includes('FAIL') || txt?.includes('OK') ? 'text-emerald-400 font-bold' : ''}>
                    {txt}
                  </span>
                </div>
              ))}
              {bootText.length < 5 && (
                <div className="flex items-center gap-1.5 text-cyan-400 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Loading metadata...</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
