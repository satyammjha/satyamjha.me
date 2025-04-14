'use client';

import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const GitHubContributionGarden = dynamic(() => import('../Garden'), {
    ssr: false,
});

export default function LazyGitHubGarden() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '150px',
    });

    return (
        <div ref={ref}>
            {inView ? <GitHubContributionGarden /> : <Skeleton height={300} />}
        </div>
    );
}
