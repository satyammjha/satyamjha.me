'use client';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Skeleton from '../components/Skeleton';
import { allBlogs } from '@/public/data/blogs';
import LazyVoiceRecorder from '@/components/Lazy/LazyVoiceRecorder';
import GitHubContributionGarden from '@/components/Garden';

const AboutSection = dynamic(() => import('@/components/about-section'), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false
});

const SkillsSection = dynamic(() => import('../components/skills/index'), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false
});

const BlogGrid = dynamic(() => import('@/components/BlogGrid'), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
  ssr: false
});

const TestimonialsSection = dynamic(() => import('@/components/testimonials-section'), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
  ssr: false
});

const ProjectsSection = dynamic(() => import('@/components/project-section'), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
  ssr: false
});

const ContactTabs = dynamic(() => import('@/components/contacts'), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false
});

const Footer = dynamic(() => import('@/components/footer'), {
  loading: () => <Skeleton className="h-[150px] w-full" />,
  ssr: false
});

export default function IndexPage() {
  return (
    <main className="space-y-20 md:space-y-32 lg:space-y-40">
      <section aria-label="Introduction">
        <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <Hero />
        </div>
      </section>

      <section aria-label="About Me" className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
          <AboutSection />
        </div>
      </section>

      <section aria-label="Technical Skills" className="py-16 md:py-24 lg:py-32 bg-muted/10">
        <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
          <SkillsSection />
        </div>
      </section>

      <section aria-label="Code Contributions" className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <GitHubContributionGarden />
        </div>
      </section>

      <section aria-label="Technical Blog" className="py-16 md:py-24 lg:py-32 bg-muted/5">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <BlogGrid blogs={allBlogs.map(blog => ({
            slug: blog.slug,
            title: blog.title,
            date: blog.date,
            image: blog.image
          }))} />
        </div>
      </section>

      <div className="container px-4 sm:px-6 md:px-8 max-w-3xl mx-auto">
        <LazyVoiceRecorder />
      </div>

      <section aria-label="Client Testimonials" className="py-16 md:py-24 lg:py-32 bg-muted/10">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <TestimonialsSection />
        </div>
      </section>

      <section aria-label="Featured Projects" className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <ProjectsSection />
        </div>
      </section>

      <section aria-label="Contact Me" className="py-16 md:py-24 lg:py-32 bg-muted/5">
        <div className="container px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
          <ContactTabs />
        </div>
      </section>

      <footer aria-label="Additional Information" className="border-t">
        <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <Footer />
        </div>
      </footer>
    </main>
  );
}