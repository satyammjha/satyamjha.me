// components/quoteCard.tsx
'use client';

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`group relative overflow-hidden p-8 shadow-sm transition-all hover:shadow-md ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50" />

      <div className="relative z-10">
        <p className="text-center text-xl font-light italic text-foreground/90 md:text-2xl">
          “{quotes[currentQuote].text}”
        </p>
        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            {quotes[currentQuote].author}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {quotes[currentQuote].source}
          </p>
        </div>
      </div>
    </Card>
  );
}