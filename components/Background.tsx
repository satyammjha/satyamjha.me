"use client";

import { useScroll, useTransform, motion } from "framer-motion";

const Background = () => {
  const { scrollYProgress } = useScroll();
  const colorStart = useTransform(
    scrollYProgress,
    [0, 1],
    ["#1e8a52", "#8a1e3d"]
  );
  const colorEnd = useTransform(
    scrollYProgress,
    [0, 1],
    ["#1e3a8a", "#0f172a"]
  );

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      style={{
        background: `linear-gradient(150deg, ${colorStart} 0%, ${colorEnd} 100%)`,
      }}
    />
  );
};

export default Background;