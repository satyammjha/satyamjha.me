// components/Background.tsx
"use client";

import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03]" />

      {/* Animated gradients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500/20 to-primary/30 blur-[100px]"
          animate={{
            x: [-50, 0, -50],
            y: [-30, 0, -30],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-teal-400/20 to-primary/30 blur-[80px]"
          animate={{
            x: [50, 0, 50],
            y: [30, 0, 30],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Background;