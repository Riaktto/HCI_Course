import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SlideTransitionProps {
  slideKey: string | number;
  direction?: number; // 1 for next, -1 for prev
  children: React.ReactNode;
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  slideKey,
  direction = 1,
  children,
}) => {
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slideKey}
          custom={direction}
          initial={{
            x: direction > 0 ? 30 : -30,
            opacity: 0,
            scale: 0.985,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
              x: { type: 'spring', stiffness: 320, damping: 32 },
              opacity: { duration: 0.28 },
              scale: { duration: 0.3 },
            },
          }}
          exit={{
            x: direction > 0 ? -25 : 25,
            opacity: 0,
            scale: 0.99,
            transition: {
              duration: 0.18,
            },
          }}
          className="w-full h-full min-h-full flex flex-col justify-between overflow-y-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
