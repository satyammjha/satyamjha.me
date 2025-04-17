'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Skeleton from '../components/Skeleton';
import { useEffect } from 'react';
import { BlogGrid } from '@/components/BlogGrid';
import { allBlogs } from '@/public/data/blogs';
import LazyGitHubGarden from '@/components/Lazy/LazyGarden';
// import { Metadata } from 'next';


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
      <main className="mx-auto flex flex-col px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section - Most Important */}
        <section aria-label="Introduction">
          <Hero />
        </section>

        {/* About Section - Core Identity */}
        <section aria-label="About Me">
          <AboutSection />
        </section>

        {/* Skills Section - Technical Expertise */}
        <section aria-label="Technical Skills">
          <SkillsSection />
        </section>

        {/* Blog Section - Thought Leadership */}
        <section aria-label="Technical Blog">
          <BlogGrid 
            blogs={allBlogs.map(blog => ({
              slug: blog.slug,
              title: blog.title,
              // excerpt: blog.email,
              date: blog.date,
              image: blog.image
            }))} 
          />
        </section>

        {/* GitHub Garden - Development Activity */}
        <section aria-label="Code Contributions">
          <LazyGitHubGarden />
        </section>

        {/* Projects/Contact - Secondary Content */}
        <section aria-label="Additional Information">
          <LazyComponents />
        </section>
      </main>
    </div>
  );
}