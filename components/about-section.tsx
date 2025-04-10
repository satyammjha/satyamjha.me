'use client';

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AboutSection() {
    return (
        <section className="w-full py-12 md:py-20">
            <div className="container px-4 md:px-6">
                <Card className="overflow-hidden border bg-card/60 p-6 md:p-10 backdrop-blur-sm shadow-lg rounded-2xl">
                    <div className="flex flex-col gap-10 md:gap-14">

                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug text-center md:text-left">
                                <span className="bg-gradient-to-r from-primary/90 to-primary/60 bg-clip-text text-transparent">
                                    Builder & Multidisciplinary Learner
                                </span>
                            </h2>
                        </div>

                        <div className="grid gap-10 md:grid-cols-2 items-start">
                          
                            <div className="space-y-6 text-foreground/90 text-base md:text-lg leading-relaxed">
                                <p>
                                    I thrive in the <span className="text-primary font-medium">entire lifecycle of creation</span> – from{" "}
                                    <span className="underline decoration-primary/40 underline-offset-4">dissecting complex problems</span> to
                                    crafting <span className="italic">elegant solutions</span>. My sweet spot? Rapid learning cycles that lead to
                                    <span className="font-semibold"> tangible impact</span>.
                                </p>
                                <p>
                                    Beyond code, I'm driven by <span className="text-primary font-medium">relentless curiosity</span> – experimenting with
                                    emerging tech, prototyping wild ideas, and exploring the intersection between{" "}
                                    <span className="text-primary">technology & human behavior</span>.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
                                {[
                                    {
                                        title: "Systems Thinking",
                                        subtitle: "Philosophy meets engineering",
                                        colorClass: "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40"
                                    },
                                    {
                                        title: "Emerging Tech",
                                        subtitle: "Always exploring new frontiers",
                                        colorClass: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40"
                                    },
                                    {
                                        title: "Design Psychology",
                                        subtitle: "Why users behave",
                                        colorClass: "bg-pink-500/10 border-pink-500/20 hover:border-pink-500/40"
                                    },
                                    {
                                        title: "Cognitive Science",
                                        subtitle: "Understanding minds",
                                        colorClass: "bg-green-500/10 border-green-500/20 hover:border-green-500/40"
                                    }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-xl p-4 md:p-5 border transition-all duration-200 hover:shadow-md ${item.colorClass}`}
                                    >
                                        <h3 className="text-base font-semibold mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="my-2" />

                        
                        <div className="text-center space-y-2">
                            <Badge variant="outline" className="bg-background/50 text-xs tracking-wider">PHILOSOPHY</Badge>
                            <p className="text-lg font-medium">
                                Technical excellence × Human-centric design ={" "}
                                <span className="italic text-primary">Impactful solutions</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                (Yes, I occasionally remember to touch grass 🌱)
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}
