'use client';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import ProjectsSection from '../project-section';

export default function LazyComponents() {

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
      <LazyVoiceRecorder />
      <TestimonialsSection />
      <ProjectsSection />
      <ContactTabs />
    </>
  );
}