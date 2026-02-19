import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface OptimizedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animationDelay?: number;
}

export const OptimizedSection = ({
  children,
  className,
  id,
  animationDelay = 0,
}: OptimizedSectionProps) => {
  return (
    <motion.section
      id={id}
      className={cn("py-12 md:py-20 relative z-10", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: animationDelay / 1000,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
};
