import React, { Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MatrixClusterBackground } from "@/components/MatrixClusterBackground";
import { BackToTopButton } from "@/components/BackToTopButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "@/components/CommandPalette";

// Lazy loaded components (below the fold)
const CyberDBAWorkspace = React.lazy(() => import("@/components/CyberDBAWorkspace").then(module => ({ default: module.CyberDBAWorkspace })));
const FuturisticTimeline = React.lazy(() => import("@/components/FuturisticTimeline").then(module => ({ default: module.FuturisticTimeline })));
const Contact = React.lazy(() => import("@/components/Contact").then(module => ({ default: module.Contact })));

// Loading fallback component
const SectionFallback = () => (
  <div className="flex items-center justify-center min-h-[300px] w-full text-blue-500/50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <span className="text-xs font-mono uppercase tracking-widest">Loading Module...</span>
    </div>
  </div>
);

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
      <Suspense fallback={<SectionFallback />}>
        <section id="operations-center" className="px-4 sm:px-6 max-w-7xl mx-auto w-full scroll-mt-20">
          <div className="space-y-3 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white leading-none">
              DBA Operations Bridge
            </h2>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
              Inspect live replica health states, run manual failover drills, execute queries in the T-SQL terminal, or fix live database incidents
              <br />
              <span className="text-[10px] text-blue-500/70 mt-2 block">(Simulated Data for Demonstration)</span>
            </p>
          </div>
          <CyberDBAWorkspace />
        </section>
      </Suspense>

      {/* 3. PROFESSIONAL TIMELINE CHRONICLES */}
      <Suspense fallback={<SectionFallback />}>
        <section id="experience" className="px-4 sm:px-6 max-w-7xl mx-auto w-full pt-24 scroll-mt-20">
          <FuturisticTimeline />
        </section>
      </Suspense>

      {/* 4. SUPABASE MESSAGE CONNECTION DESK */}
      <Suspense fallback={<SectionFallback />}>
        <div className="scroll-mt-20">
          <Contact />
        </div>
      </Suspense>

      <BackToTopButton />
    </div>
  );
};

export default Index;
