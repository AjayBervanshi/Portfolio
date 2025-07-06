
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-blue-800 to-slate-600">
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
