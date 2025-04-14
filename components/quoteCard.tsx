'use client';

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    text: "The best way to predict the future is to implement it.",
    author: "David Heinemeier Hansson",
    source: "Creator of Ruby on Rails"
  },
  {
    text: "It's not a bug – it's an undocumented feature.",
    author: "Anonymous Developer",
    source: "Stack Overflow"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    source: "Wisdom of the Ancients (Dev Edition)"
  },
  {
    text: "I don't always test my code, but when I do, I do it in production.",
    author: "Most of Us",
    source: "DevOps Confessions"
  },
  {
    text: "The proper way to plan a program is to write code.",
    author: "Kent Beck",
    source: "Extreme Programming Explained"
  }
];


export default function QuoteCard({ className }: { className?: string }) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  return (
    <Card
      className={`relative overflow-hidden p-8 shadow-sm transition-all hover:shadow-lg border-t-4 border-primary/20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="absolute left-0 top-0 h-full w-1 bg-primary/20" />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <blockquote className="text-center">
              <div className="mb-4 text-4xl text-primary/30">“</div>
              <p className="text-lg font-normal text-foreground/90 md:text-xl mb-6 leading-relaxed">
                {quotes[currentQuote].text}
              </p>
              <div className="mt-6 text-right">
                <p className="text-sm font-medium text-muted-foreground">
                  — {quotes[currentQuote].author}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  {quotes[currentQuote].source}
                </p>
              </div>
            </blockquote>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prevQuote}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Previous quote"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="h-1 w-8 bg-muted-foreground/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary/80"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 8, ease: "linear" }}
              key={currentQuote}
            />
          </div>
          <button
            onClick={nextQuote}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Next quote"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}