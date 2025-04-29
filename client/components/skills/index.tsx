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
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = Object.keys(skills) as Array<keyof typeof skills>;

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (autoScrollEnabled) return;

        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          
          const category = mostVisible.target.getAttribute('data-category');
          if (category && category !== activeCategory) {
            setActiveCategory(category as keyof typeof skills);
          }
        }
      },
      {
        root: skillsContainerRef.current,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
      }
    );

    Object.keys(categoryRefs.current).forEach(category => {
      const element = categoryRefs.current[category];
      if (element) observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [categories, autoScrollEnabled, activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (autoScrollEnabled) {
        setAutoScrollEnabled(false);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };

    const container = skillsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [autoScrollEnabled]);

  const scrollToCategory = (category: keyof typeof skills) => {
    const element = categoryRefs.current[category];
    if (element && skillsContainerRef.current) {
      setAutoScrollEnabled(true);
      
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveCategory(category);
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setAutoScrollEnabled(false);
        }, 1000);
      }, 50);
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
  }, [autoScrollEnabled, activeCategory, categories]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (categories.indexOf(activeCategory) + 1) % categories.length;
        scrollToCategory(categories[nextIndex]);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (categories.indexOf(activeCategory) - 1 + categories.length) % categories.length;
        scrollToCategory(categories[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory, categories]);

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
  };

  return (
    <section className="relative py-12 md:py-20 px-4 bg-transparent" id="skills">
      <div className="mx-auto max-w-7xl">
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
            categories={categories}
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
    <motion.div 
      className="flex flex-row lg:flex-col gap-2 md:gap-1.5 lg:gap-2 pb-3 lg:pb-0 overflow-x-auto lg:overflow-visible scrollbar-hide flex-nowrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.05 }}
    >
      {categories.map((category: keyof typeof skills) => {
        const Icon = categoryIcons[category];
        const isActive = category === activeCategory;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categories.indexOf(category) * 0.05 }}
            className="flex-shrink-0 lg:flex-shrink lg:w-full px-1 md:px-0.5 lg:px-0"
          >
            <Button
              variant="ghost"
              aria-label="Select Category"
              onClick={() => {
                setAutoScrollEnabled(false);
                scrollToCategory(category);
              }}
              className={cn(
                "justify-start h-10 md:h-11 lg:h-12 px-3 sm:px-4 py-1.5 sm:py-2 w-full",
                "text-sm md:text-base lg:text-sm font-medium",
                "transition-all duration-300 ease-in-out",
                isActive 
                  ? `bg-gradient-to-r ${categoryGradients[category]} text-white shadow-md`
                  : "hover:bg-muted/50 text-foreground/80"
              )}
            >
              <Icon className={cn(
                "w-4 h-4 sm:w-5 sm:h-5 mr-2 lg:mr-3",
                isActive ? "text-white" : "text-muted-foreground"
              )} />
              <span className="text-left truncate max-w-[120px] sm:max-w-[140px] md:max-w-full capitalize">
                {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span className={cn(
                "ml-auto",
                isActive ? "text-white/90" : "text-muted-foreground/70",
                "hidden sm:block text-xs md:text-sm"
              )}>
                {skills[category].length}
              </span>
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
);

const SkillsPanel = ({
  skillsContainerRef,
  categoryRefs,
  activeCategory,
  handleSkillClick,
  selectedSkill,
  categories,
}: {
  skillsContainerRef: React.RefObject<HTMLDivElement>;
  categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement }>;
  activeCategory: keyof typeof skills;
  handleSkillClick: (skill: string) => void;
  selectedSkill: string | null;
  categories: Array<keyof typeof skills>;
}) => (
  <div
    ref={skillsContainerRef}
    className="lg:col-span-8 h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-12rem)] overflow-y-auto snap-y snap-mandatory scrollbar-hide rounded-lg"
    style={{ scrollSnapType: 'y mandatory' }}
  >
    <AnimatePresence>
      {categories.map((category) => (
        <motion.div
          key={category}
          ref={(el) => {
            if (el) {
              categoryRefs.current[category] = el;
            }
          }}
          data-category={category}
          className="min-h-[50vh] sm:min-h-[60vh] lg:min-h-[calc(100vh-12rem)] snap-always snap-start py-6 px-3 md:px-6"
          initial={{ opacity: 0.4 }}
          animate={{
            opacity: category === activeCategory ? 1 : 0.4,
            scale: category === activeCategory ? 1 : 0.98,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full p-4 sm:p-6 rounded-xl bg-muted/10 border backdrop-blur-sm h-full flex flex-col">
            <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 rounded-lg ${categoryColors[category]} flex items-center justify-center shrink-0`}>
                {React.createElement(categoryIcons[category], { className: "w-4 h-4 text-white" })}
              </div>
              <h3 className="text-lg md:text-xl font-semibold capitalize">
                {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <span className="ml-auto text-sm text-muted-foreground lg:hidden">
                {skills[category].length} skills
              </span>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 justify-items-center flex-grow">
              {skills[category].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full relative"
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className={cn(
                    "p-2 sm:p-3 rounded-lg text-xs sm:text-sm cursor-pointer transition-all text-center relative",
                    "bg-background border hover:border-primary/50 hover:shadow-sm",
                    selectedSkill === skill && `${categoryColors[category]} text-white shadow-md`
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
        </motion.div>
      ))}
    </AnimatePresence>
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
              : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
          aria-label={`Go to ${category} category`}
        />
      ))}
    </div>
  </div>
);