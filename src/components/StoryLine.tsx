import { motion, useScroll, useSpring } from "framer-motion";

export const StoryLine = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-4 md:left-8 bottom-0 w-0.5 z-40 pointer-events-none">
      <div className="absolute inset-0 bg-slate-800/20" />
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 origin-top"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
};
