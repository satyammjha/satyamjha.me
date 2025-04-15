'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Skeleton from '../components/Skeleton';
import { useEffect } from 'react';

const AboutSection = dynamic(() => import('@/components/about-section'), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false
});

const SkillsSection = dynamic(() => import('../components/skills/index'), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false
});

const LazyComponents = dynamic(() => import('@/components/Lazy/LazyComponents'), {
  loading: () => <div className="space-y-16"><Skeleton className="h-[150px] w-full" /></div>,
  ssr: false
});

export default function IndexPage() {
  useEffect(() => {
    const preload = async () => {
      const { preload } = await import('@/lib/preload');
      preload(['/components/about-section', '/components/skills/index']);
    };
    window.requestIdleCallback(preload);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex flex-col px-4 sm:px-6 lg:px-8 ">
        <Hero />
        <AboutSection />
        <SkillsSection />
        <LazyComponents />
      </main>
    </div>
  );
}