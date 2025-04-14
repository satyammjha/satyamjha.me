'use client';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import ProjectsSection from '../project-section';

export default function LazyComponents() {
  const QuoteCard = dynamic(() => import('@/components/quoteCard'), { 
    loading: () => <Skeleton className="h-[100px] w-full" />
  });

  const TestimonialsSection = dynamic(() => import('@/components/testimonials-section'), {
    loading: () => <Skeleton className="h-[200px] w-full" />
  });

  const ContactTabs = dynamic(() => import('@/components/contacts'), {
    loading: () => <Skeleton className="h-[150px] w-full" />
  });

  const LazyVoiceRecorder = dynamic(() => import('@/components/Lazy/LazyVoiceRecorder'), {
    loading: () => <Skeleton className="h-[150px] w-full" />
  });

  return (
    <>
      <QuoteCard />
      <LazyVoiceRecorder />
      <TestimonialsSection />
      <ProjectsSection />
      <ContactTabs />
    </>
  );
}