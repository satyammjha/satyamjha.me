'use client';

import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const VoiceRecorderSection = dynamic(() => import('../recorder'), {
    ssr: false,
    loading: () => <Skeleton height={250} />,
});

export default function LazyVoiceRecorder() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px',
    });

    return (
        <div ref={ref} className="min-h-[250px]">
            {inView ? <VoiceRecorderSection /> : <Skeleton height={250} />}
        </div>
    );
}
