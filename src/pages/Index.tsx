
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { EnhancedThreeBackground } from "@/components/EnhancedThreeBackground";
import { OptimizedSection } from "@/components/OptimizedSection";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Suspense, lazy } from "react";

// Lazy load non-critical components for better initial load
const LazySkills = lazy(() => import("@/components/Skills").then(module => ({ default: module.Skills })));
const LazyExperience = lazy(() => import("@/components/Experience").then(module => ({ default: module.Experience })));
const LazyEducation = lazy(() => import("@/components/Education").then(module => ({ default: module.Education })));

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      <EnhancedThreeBackground />
      <Navigation />
      <Hero />
      
      <OptimizedSection animationDelay={100}>
        <About />
      </OptimizedSection>
      
      <OptimizedSection animationDelay={200}>
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-cyan-400">Loading...</div></div>}>
          <LazySkills />
        </Suspense>
      </OptimizedSection>
      
      <OptimizedSection animationDelay={300}>
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-cyan-400">Loading...</div></div>}>
          <LazyExperience />
        </Suspense>
      </OptimizedSection>
      
      <OptimizedSection animationDelay={400}>
        <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="animate-pulse text-cyan-400">Loading...</div></div>}>
          <LazyEducation />
        </Suspense>
      </OptimizedSection>
      
      <OptimizedSection animationDelay={500}>
        <Contact />
      </OptimizedSection>
      
      <BackToTopButton />
    </div>
  );
};

export default Index;
