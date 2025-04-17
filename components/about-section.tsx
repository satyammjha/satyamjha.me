'use client';

import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobeIcon, RocketIcon, BrainIcon, PuzzleIcon } from "lucide-react";

export default function AboutSection() {
    const interests = [
        {
            title: "Systems Design",
            subtitle: "Scalable foundations",
            icon: <PuzzleIcon className="w-5 h-5" />,
            color: "bg-violet-100 dark:bg-violet-900/30"
        },
        {
            title: "Emergent Tech",
            subtitle: "Exploring frontiers",
            icon: <RocketIcon className="w-5 h-5" />,
            color: "bg-cyan-100 dark:bg-cyan-900/30"
        },
        {
            title: "Cognitive Patterns",
            subtitle: "Human-centered focus",
            icon: <BrainIcon className="w-5 h-5" />,
            color: "bg-pink-100 dark:bg-pink-900/30"
        },
        {
            title: "Global Systems",
            subtitle: "Cultural infrastructure",
            icon: <GlobeIcon className="w-5 h-5" />,
            color: "bg-teal-100 dark:bg-teal-900/30"
        }
    ];

    return (
        <section className="w-full py-16 md:py-24">
            <div className="px-4 md:px-6 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Card className="border bg-card rounded-2xl">
                        <div className="p-6 md:p-8 lg:p-10 space-y-8">
                            <div className="space-y-3">
                                <Badge variant="secondary" className="text-primary">
                                    Developer & Thinker
                                </Badge>
                                <h2 className="text-3xl md:text-4xl font-bold">
                                    Building Future-Ready Systems
                                </h2>
                            </div>

                            <div className="space-y-6 text-foreground/90">
                                <p className="text-lg leading-relaxed">
                                    I specialize in creating solutions that balance technical precision
                                    with human-centric design. My approach combines computer science
                                    fundamentals with behavioral insights to build adaptive systems.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {interests.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            className={`rounded-lg p-4 ${item.color} border`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {item.icon}
                                                <div>
                                                    <h3 className="font-medium">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t">
                                <p className="text-lg text-center font-medium">
                                    “Innovation through{" "}
                                    <span className="text-primary">curiosity</span> and{" "}
                                    <span className="text-primary">execution</span>”
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}