import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, TwitterIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import profile from "../public/pfp.jpg";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="container relative flex min-h-[90vh] items-center gap-8 overflow-hidden md:gap-16">
            + <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_at_center,_hsl(var(--primary)/.1)_0%,_hsl(var(--background))_70%)]" />
            <motion.div
                className="flex flex-1 flex-col gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col gap-2">
                    <motion.h1
                        className="font-mono text-lg text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        &gt; HelloWorld.java
                    </motion.h1>

                    <div className="relative">
                        <motion.h2
                            className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Satyam Jha
                            </span>
                            <span className="ml-2 inline-block h-[0.8em] w-[2px] animate-blink bg-foreground align-baseline" />
                        </motion.h2>

                        <motion.h3
                            className="mt-2 font-mono text-xl text-muted-foreground md:text-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="animate-[typing_3s_steps(22,end)] overflow-hidden border-r-2 border-r-foreground pr-1">
                                Full Stack Alchemist
                            </span>
                        </motion.h3>
                    </div>
                </div>

                <motion.p
                    className="max-w-[600px] text-lg leading-relaxed text-foreground/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Transforming {''}
                    <span className="bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text font-medium text-transparent">
                        coffee
                    </span>
                    {' '}into code and {' '}
                    <span className="bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text font-medium text-transparent">
                        ideas
                    </span>
                    {' '}into interfaces. Professional problem creator with a knack for
                    <span className="line-through decoration-destructive"> solving them</span>.
                </motion.p>

                <motion.div
                    className="flex gap-4 flex-col md:flex-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Button
                        asChild
                        className="group w-full gap-2 px-6 py-5 text-base transition-all hover:shadow-lg"
                        variant="default"
                    >
                        <Link href="#contact">
                            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span className="bg-gradient-to-r from-background to-background/70 bg-clip-text text-transparent">
                             <span className="mix-blend-exclusion">Start a Fire</span>
                            </span>
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="group w-full gap-2 px-6 py-5 text-base backdrop-blur-sm transition-all hover:shadow-lg"
                    >
                        <Link href="#projects">
                            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Witness My Growth
                            </span>
                            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </Button>
                </motion.div>

                <motion.div
                    className="flex items-center gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    {[
                        { icon: Github, href: "https://github.com/satyammjha" },
                        { icon: Linkedin, href: "https://linkedin.com/in/satyammjha" },
                        { icon: TwitterIcon, href: "https://x.com/satyammjha" },
                    ].map(({ icon: Icon, href }, index) => (
                        <Link
                            key={index}
                            href={href}
                            target="_blank"
                            className="text-foreground/70 transition-all hover:scale-110 hover:text-foreground"
                        >
                            <Icon className="h-6 w-6" />
                            <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-10 bg-current" />
                        </Link>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                className="hidden flex-1 md:flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="relative aspect-square w-full">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-2xl" />
                    <div className="relative aspect-square w-full overflow-hidden rounded-full border border-primary/20 bg-background/5 backdrop-blur-lg">
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            }}
                        >
                            <Image
                                src={profile}
                                alt="Satyam Jha"
                                fill
                                className="object-cover"
                                priority
                                quality={60}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="eager"
                            />
                        </motion.div>
                        <div className="absolute inset-0 rounded-full border border-primary/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}