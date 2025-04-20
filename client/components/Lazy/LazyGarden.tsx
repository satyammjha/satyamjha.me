'use client';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Skeleton from '../Skeleton';

const LazyGitHubGarden = dynamic(() => import('@/components/Lazy/LazyGarden'), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false
});

function GitHubGardenWrapper() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1 
  });

  return (
    <section aria-label="Code Contributions" ref={ref} className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {inView ? <LazyGitHubGarden /> : <Skeleton className="h-[200px] w-full" />}
      </div>
    </section>
  );
}

export default GitHubGardenWrapper;