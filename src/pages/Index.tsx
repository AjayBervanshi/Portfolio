import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MatrixClusterBackground } from "@/components/MatrixClusterBackground";
import { CyberDBAWorkspace } from "@/components/CyberDBAWorkspace";
import { FuturisticTimeline } from "@/components/FuturisticTimeline";
import { Contact } from "@/components/Contact";
import { BackToTopButton } from "@/components/BackToTopButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "@/components/CommandPalette";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative flex flex-col justify-start pb-20 overflow-hidden font-sans">
      <ScrollProgress />
      <MatrixClusterBackground />
      <Navigation />
      <CommandPalette />
      
      {/* 1. HERO SPEECH & DATA BOOT LOADER */}
      <Hero />
      
      {/* 2. DYNAMIC BENTO CYBER WORKSPACE */}
      <section id="operations-center" className="px-4 sm:px-6 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="space-y-3 text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white leading-none">
            DBA Operations Bridge
          </h2>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Inspect live replica health states, run manual failover drills, execute queries in the T-SQL terminal, or fix live database incidents
          </p>
        </div>
        <CyberDBAWorkspace />
      </section>

      {/* 3. PROFESSIONAL TIMELINE CHRONICLES */}
      <section id="experience" className="px-4 sm:px-6 max-w-7xl mx-auto w-full pt-24 scroll-mt-20">
        <FuturisticTimeline />
      </section>

      {/* 4. SUPABASE MESSAGE CONNECTION DESK */}
      <div className="scroll-mt-20">
        <Contact />
      </div>

      <BackToTopButton />
    </div>
  );
};

export default Index;
