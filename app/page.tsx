'use client';
import { useRef, useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import QuoteCard from '@/components/quoteCard';
import AboutSection from '@/components/about-section';
import { SkillsSection } from '../components/skills';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { motion, useScroll, useAnimation, useSpring, useTransform } from 'framer-motion';
import { ProjectsSection } from '@/components/project-section';

export default function IndexPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const bgControls = useAnimation();
  const primaryGlowX = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const primaryGlowY = useTransform(smoothProgress, [0, 1], ['0%', '60%']);
  const secondaryGlowX = useTransform(smoothProgress, [0, 1], ['100%', '30%']);
  const secondaryGlowY = useTransform(smoothProgress, [0, 1], ['0%', '80%']);

  const primaryHue = useTransform(smoothProgress, [0, 0.5, 1], [180, 210, 240]);  
  const primarySaturation = useTransform(smoothProgress, [0, 1], [80, 60]);
  const primaryLightness = useTransform(smoothProgress, [0, 1], [90, 85]);

  const secondaryHue = useTransform(smoothProgress, [0, 0.5, 1], [160, 190, 220]);
  const secondarySaturation = useTransform(smoothProgress, [0, 1], [70, 50]);
  const secondaryLightness = useTransform(smoothProgress, [0, 1], [92, 88]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (skillsRef.current && scrollPosition >= skillsRef.current.offsetTop) {
        setActiveSection('skills');
      } else if (quoteRef.current && scrollPosition >= quoteRef.current.offsetTop) {
        setActiveSection('quote');
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('hero');
      }

      setShowScrollTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-background relative overflow-hidden">
 
      <div className="fixed inset-0 -z-50 overflow-hidden">
       
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              smoothProgress,
              [0, 1],
              [
                'radial-gradient(80% 80% at 50% 50%, hsl(185, 80%, 95%) 0%, hsl(195, 70%, 92%) 40%, hsl(205, 60%, 97%) 100%)',
                'radial-gradient(80% 80% at 50% 50%, hsl(210, 70%, 95%) 0%, hsl(220, 60%, 92%) 40%, hsl(230, 50%, 97%) 100%)'
              ]
            )
          }}
        />

        <motion.div
          className="absolute w-full h-full"
          style={{
            x: primaryGlowX,
            y: primaryGlowY,
            background: useTransform(
              [primaryHue, primarySaturation, primaryLightness],
              ([h, s, l]) => `radial-gradient(circle 800px at 0% 0%, hsla(${h}, ${s}%, ${l}%, 0.4) 0%, transparent 70%)`
            ),
          }}
        />

        <motion.div
          className="absolute w-full h-full"
          style={{
            x: secondaryGlowX,
            y: secondaryGlowY,
            background: useTransform(
              [secondaryHue, secondarySaturation, secondaryLightness],
              ([h, s, l]) => `radial-gradient(circle 600px at 100% 100%, hsla(${h}, ${s}%, ${l}%, 0.3) 0%, transparent 60%)`
            ),
          }}
        />

        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <motion.path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    strokeWidth: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-primary/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: "linear-gradient(45deg, transparent 95%, rgba(255, 255, 255, 0.4) 100%)",
            backgroundSize: "400% 400%"
          }}
        />
      </div>

      <div className="fixed inset-0 -z-40 dark:bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.95)_20%,rgba(23,23,23,0.9)_80%)] dark:backdrop-blur-xl" />

      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
        {['hero', 'about', 'quote', 'skills'].map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(
              section === 'hero' ? heroRef :
                section === 'about' ? aboutRef :
                  section === 'quote' ? quoteRef : skillsRef
            )}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section
              ? 'bg-primary w-5 h-5'
              : 'bg-muted hover:bg-primary/50'
              }`}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-50 hover:bg-primary/90 transition-colors backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={heroRef} className="min-h-screen flex flex-col justify-center relative">
          <Hero />
          <motion.div
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection(aboutRef)}
          >
            <ChevronDown size={30} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground block text-center mt-1">Scroll Down</span>
          </motion.div>
        </div>

        <div ref={aboutRef} className="min-h-screen flex items-center py-16 backdrop-blur-sm">
          <AboutSection />
        </div>

        <div ref={quoteRef} className="py-24 flex items-center backdrop-blur-sm">
          <div className="w-full max-w-3xl mx-auto">
            <QuoteCard className="transform hover:scale-[1.02] transition-transform duration-300" />
          </div>
        </div>

        <div ref={skillsRef} className="py-16 backdrop-blur-sm">
          <SkillsSection />
        </div>

        <ProjectsSection />
      </div>
    </div>
  );
}