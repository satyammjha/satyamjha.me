'use client';

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="container py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="relative overflow-hidden border-0 bg-background/80 p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl dark:shadow-primary/20">

                    <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

                    <div className="flex flex-col gap-12 md:flex-row">
                        <div className="flex-1 space-y-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold tracking-tight">
                                    <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                                        Builder & Multidisciplinary Learner
                                    </span>
                                    {/* <Sparkles className="ml-2 inline h-6 w-6 text-primary/80" /> */}
                                </h2>
                            </motion.div>

                            <div className="space-y-6">
                                <motion.p
                                    className="text-xl leading-relaxed text-foreground/90"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    I thrive in the <span className="font-medium text-primary">entire lifecycle of creation</span> -
                                    from <span className="underline decoration-primary/30 underline-offset-4">dissecting complex problems</span> to
                                    crafting <span className="italic text-primary">elegant solutions</span>. My sweet spot?
                                    Rapid learning cycles that lead to <span className="font-semibold text-primary">tangible impact</span>.
                                </motion.p>

                                <motion.p
                                    className="text-xl leading-relaxed text-foreground/90"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Beyond code, I'm driven by <span className="text-primary">relentless curiosity</span> that spans:
                                    experimenting with emerging tech, prototyping wild ideas, and exploring
                                    the intersection between <span className="text-primary">technology & human behavior</span>.
                                </motion.p>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid h-full grid-cols-2 gap-4">
                                {[
                                    {
                                        // icon: <BookOpen className="h-8 w-8" />,

                                        title: "Systems Thinking",
                                        subtitle: "Philosophy meets engineering",
                                        color: "text-purple-400"
                                    },
                                    {
                                        // icon: <Cpu className="h-8 w-8" />,
                                        title: "Emerging Tech",
                                        subtitle: "Always exploring new frontiers",
                                        color: "text-blue-400"
                                    },
                                    {
                                        // icon: <PaletteIcon className="h-8 w-8" />,
                                        title: "Design Psychology",
                                        subtitle: "Why users behave",
                                        color: "text-pink-400"
                                    },
                                    {
                                        // icon: <BrainCircuitIcon className="h-8 w-8" />,
                                        title: "Cognitive Science",
                                        subtitle: "Understanding minds",
                                        color: "text-green-400"
                                    }

                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group relative overflow-hidden rounded-xl border bg-background/60 p-6 backdrop-blur-sm transition-all hover:bg-background/80"
                                    >
                                        <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${item.color}/20 blur-xl`} />
                                        <div className={`mb-4 ${item.color}`}>
                                            {/* {item.icon} */}
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold text-foreground/90">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-foreground/70">
                                            {item.subtitle}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="my-12 flex items-center justify-center">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-xl font-medium text-foreground/90">
                            <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                                Core Philosophy:
                            </span>{' '}
                            Technical excellence × Human-centric design ={' '}
                            <span className="italic text-primary">Impactful solutions</span>
                        </p>
                        <p className="mt-4 text-sm text-muted-foreground">
                            (Yes, I occasionally remember to touch grass 🌱)
                        </p>
                    </motion.div>
                </Card>
            </motion.div>
        </section>
    );
}