'use client';

import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';

const VoiceRecorderSection = dynamic(() => import('../recorder'), {
    ssr: false,
});

export default function LazyVoiceRecorder() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '150px',
    });

    return (
        <div ref={ref}>
            {inView ? <VoiceRecorderSection /> : <Skeleton height={150} />}
        </div>
    );
}