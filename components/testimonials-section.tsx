'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { User, Linkedin, Globe } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

const testimonials = [
    {
        name: 'Ashish Kumar',
        role: 'CEO @gigabytecoders.com',
        message: 'Satyam is the rare developer who combines technical brilliance with clear communication...',
        image: '/testimonials/alex.jpg',
        link: 'https://linkedin.com/in/alexjohnson'
    },
    {
        name: 'Maria Gonzalez',
        role: 'Lead Designer @CreativeStudio',
        message: 'Working with Satyam was a revelation. He understands design intent better than anyone...',
        link: 'https://creativestudio.com'
    },
    {
        name: 'Raj Patel',
        role: 'Startup Founder',
        message: 'Satyam saved our product launch with his quick problem-solving skills...',
        image: '/testimonials/raj.jpg'
    },
];

export default function TestimonialsSection() {
    const containerRef = useRef(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const testimonialCount = testimonials.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const index = useTransform(scrollYProgress, [0, 1], [0, testimonialCount - 1]);
    const [activeIndex, setActiveIndex] = useState(0);

    useMotionValueEvent(index, 'change', (latest) => {
        setActiveIndex(Math.round(latest));
    });

    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonialCount);
        }, 2000);

        return () => clearInterval(interval);
    }, [isMobile]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setActiveIndex((prev) => Math.min(prev + 1, testimonialCount - 1));
            } else if (e.key === 'ArrowLeft') {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-gradient-to-b from-background/50 to-muted/20">

            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="max-w-2xl w-full px-4 text-center relative">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Kind Words From Colleagues
                    </motion.h2>

                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: 80,
                                left: 0,
                                right: 0,
                                opacity: activeIndex === i ? 1 : 0,
                                scale: activeIndex === i ? 1 : 0.9,
                                pointerEvents: activeIndex === i ? 'auto' : 'none',
                                transition: 'all 0.5s ease',
                            }}
                            className="mx-auto px-6 py-10 rounded-xl bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200/20 shadow-md max-w-lg"
                        >
                            {/* <div className="flex items-center justify-center mb-4">
                                <div className="relative h-14 w-14">
                                    {t.image ? (
                                        <Image
                                            src={t.image}
                                            alt={t.name}
                                            fill
                                            className="rounded-full object-cover border-2 border-gray-300"
                                        />
                                    ) : (
                                        <div className="h-full w-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <User className="h-6 w-6 text-gray-500" />
                                        </div>
                                    )}
                                </div>
                            </div> */}
                            <h3 className="text-lg font-semibold">{t.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{t.role}</p>
                            <p className="text-base text-foreground/90 italic">"{t.message}"</p>
                            {t.link && (
                                <a
                                    href={t.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm mt-3 text-primary hover:text-primary/80"
                                >
                                    {t.link.includes('linkedin') ? (
                                        <>
                                            <Linkedin className="h-4 w-4" /> LinkedIn
                                        </>
                                    ) : (
                                        <>
                                            <Globe className="h-4 w-4" /> Website
                                        </>
                                    )}
                                </a>
                            )}
                        </motion.div>
                    ))}

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${i === activeIndex ? 'bg-primary w-4' : 'bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
