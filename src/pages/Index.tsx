
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { ThreeBackground } from "@/components/ThreeBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      <ThreeBackground />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </div>
  );
};

export default Index;
