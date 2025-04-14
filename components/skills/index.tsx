"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Award, Code, Layout, Server, GitBranch, Sparkles, PenTool, Info } from "lucide-react";
import { skills, categoryIcons, categoryColors, categoryGradients, skillDescriptions } from "./skills-data";
import { SkillModal } from "./skill-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skills>("languages");
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const categories = Object.keys(skills) as Array<keyof typeof skills>;
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const category = entry.target.getAttribute('data-category');
            if (category && category !== activeCategory) {
              setActiveCategory(category as keyof typeof skills);
            }
          }
        });
      },
      {
        root: skillsContainerRef.current,
        threshold: 0.5
      }
    );

    categories.forEach(category => {
      const element = categoryRefs.current[category as string];
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [activeCategory]);

  const scrollToCategory = (category: keyof typeof skills) => {
    const element = categoryRefs.current[category];
    if (element && skillsContainerRef.current) {
      setAutoScrollEnabled(true);
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setAutoScrollEnabled(false), 500);
    }
  };

  useEffect(() => {
    if (!autoScrollEnabled) return;

    const interval = setInterval(() => {
      const currentIndex = categories.indexOf(activeCategory);
      const nextIndex = (currentIndex + 1) % categories.length;
      scrollToCategory(categories[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScrollEnabled, activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const nextIndex = (categories.indexOf(activeCategory) + 1) % categories.length;
        scrollToCategory(categories[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const prevIndex = (categories.indexOf(activeCategory) - 1 + categories.length) % categories.length;
        scrollToCategory(categories[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory]);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
  };


  return (
    <section className="relative py-12 md:py-20 px-4 bg-background">
      <div className="mx-auto max-w-max">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          Technical Expertise
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          <CategoryNavigation
            categories={categories}
            activeCategory={activeCategory}
            scrollToCategory={scrollToCategory}
            setAutoScrollEnabled={setAutoScrollEnabled}
          />

          <SkillsPanel
            skillsContainerRef={skillsContainerRef}
            categoryRefs={categoryRefs}
            activeCategory={activeCategory}
            handleSkillClick={handleSkillClick}
            selectedSkill={selectedSkill}
          />
        </div>

        <SkillModal
          selectedSkill={selectedSkill}
          activeCategory={activeCategory}
          setSelectedSkill={setSelectedSkill}
        />

        <ProgressIndicator
          categories={categories}
          activeCategory={activeCategory}
          scrollToCategory={scrollToCategory}
        />
      </div>
    </section>
  );
}

type CategoryNavigationProps = {
  categories: Array<keyof typeof skills>;
  activeCategory: keyof typeof skills;
  scrollToCategory: (category: keyof typeof skills) => void;
  setAutoScrollEnabled: (enabled: boolean) => void;
};

const CategoryNavigation = ({ categories, activeCategory, scrollToCategory, setAutoScrollEnabled }: CategoryNavigationProps) => (
  <div className="lg:col-span-4 lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)] lg:mt-2">
    <div className="flex flex-row lg:flex-col gap-2 md:gap-1.5 lg:gap-2 pb-3 lg:pb-0 overflow-x-auto lg:overflow-visible scrollbar-hide flex-nowrap">
      {categories.map((category: keyof typeof skills) => {
        const Icon = categoryIcons[category];
        const isActive = category === activeCategory;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categories.indexOf(category) * 0.05 }}
            className="flex-shrink-0 lg:flex-shrink lg:w-full px-1 md:px-0.5 lg:px-0" // Added horizontal padding for mobile
          >
            <Button
              variant="ghost"
              onClick={() => {
                setAutoScrollEnabled(false);
                scrollToCategory(category);
              }}
              className={cn(
                "justify-start h-10 lg:h-12 px-3 sm:px-4 py-1.5 sm:py-2 w-full", // Adjusted padding for different screens
                "text-sm md:text-base lg:text-sm", // Responsive text sizing
                isActive && `bg-gradient-to-r ${categoryGradients[category]} text-white`,
                "hover:bg-muted/50" // Added hover state
              )}
            >
              <Icon className="w-5 h-5 mr-2 lg:mr-3" /> {/* Increased icon spacing */}
              <span className="text-left truncate max-w-[120px] md:max-w-full"> {/* Added max-width for mobile */}
                {category.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span className="ml-auto text-muted-foreground/80 md:block hidden"> {/* Show count on tablet+ */}
                {skills[category].length}
              </span>
            </Button>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const SkillsPanel = ({
  skillsContainerRef,
  categoryRefs,
  activeCategory,
  handleSkillClick,
  selectedSkill,
}: {
  skillsContainerRef: React.RefObject<HTMLDivElement>;
  categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement }>;
  activeCategory: keyof typeof skills;
  handleSkillClick: (skill: string) => void;
  selectedSkill: string | null;
}) => (
  <div
    ref={skillsContainerRef}
    className="lg:col-span-8  h-[50vh] lg:h-[calc(100vh-12rem)] overflow-y-auto snap-y snap-mandatory scrollbar-hide"
  >
    {Object.entries(skills).map(([category, items]) => (
      <div
        key={category}
        ref={(el) => {
          if (el) {
            categoryRefs.current[category] = el;
          }
        }}
        data-category={category}
        className="h-[80vh] lg:h-[calc(100vh-12rem)] snap-always snap-start flex items-center"
      >
        <div className="w-full p-6 rounded-xl bg-muted/10 border backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${categoryColors[category as keyof typeof categoryColors]} flex items-center justify-center`}>
              {React.createElement(categoryIcons[category as keyof typeof categoryIcons], { className: "w-4 h-4 text-white" })}
            </div>
            <h3 className="text-lg font-semibold">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-center">
            {items.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="w-full max-w-[200px] relative"
                onClick={() => handleSkillClick(skill)}
              >
                <div className={cn(
                  "p-3 rounded-lg text-sm cursor-pointer transition-all text-center relative",
                  "bg-background border hover:border-primary/50",
                  selectedSkill === skill && `${categoryColors[category as keyof typeof categoryColors]} text-white`
                )}>
                  {skill}
                  {skillDescriptions[skill] && (
                    <Info className="absolute bottom-1 right-1 w-3 h-3 text-muted-foreground" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

type ProgressIndicatorProps = {
  categories: Array<keyof typeof skills>;
  activeCategory: keyof typeof skills;
  scrollToCategory: (category: keyof typeof skills) => void;
};

const ProgressIndicator = ({ categories, activeCategory, scrollToCategory }: ProgressIndicatorProps) => (
  <div className="mt-8 flex justify-center">
    <div className="flex gap-1.5 bg-muted/50 p-1.5 rounded-full backdrop-blur-sm">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => scrollToCategory(category)}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            category === activeCategory
              ? `w-6 ${categoryColors[category]}`
              : "w-1.5 bg-muted-foreground/30"
          )}
        />
      ))}
    </div>
  </div>
);