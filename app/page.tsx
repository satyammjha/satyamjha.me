'use client';
import Hero from '@/components/Hero';
import QuoteCard from '@/components/quoteCard';
import AboutSection from '@/components/about-section';
import { SkillsSection } from '../components/skills';
import { ProjectsSection } from '@/components/project-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Footer } from '@/components/footer';
import { VoiceRecorderSection } from '@/components/recorder';
import { ContactTabs } from '@/components/contacts';
import GitHubContributionGarden from '@/components/Garden';

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex flex-col gap-16 px-4 sm:px-6 lg:px-8 py-12">
        <section className="min-h-[80vh] flex flex-col justify-center">
          <Hero />
        </section>

        <AboutSection />

        <section>
          <GitHubContributionGarden />
        </section>

        <QuoteCard />

        <VoiceRecorderSection />

        <SkillsSection />

        <TestimonialsSection />

        <ProjectsSection />

        <ContactTabs />

        <Footer />
      </div>
    </div>
  );
}