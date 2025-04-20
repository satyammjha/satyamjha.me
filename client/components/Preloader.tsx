'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function Preloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center bg-background"
          initial={{ backdropFilter: 'blur(20px)', opacity: 1 }}
          animate={{ backdropFilter: 'blur(8px)' }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)',
            transition: {
              duration: 2,
              ease: [0.4, 0, 0.2, 1],
              backdropFilter: { duration: 2.5 }
            }
          }}
        >
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            >
              <Loader2 className="h-12 w-12 text-primary" />
            </motion.div>
            <motion.div
              className="h-1 w-32 rounded-full bg-primary/20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.5, ease: 'linear' }}
            >
              <div className="h-full w-full origin-left rounded-full bg-primary bg-gradient-to-r from-primary to-primary/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}