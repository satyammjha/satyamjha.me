import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import profile from "../public/pfp.jpg";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="container flex min-h-[90vh] items-center gap-8 md:gap-16">

            <motion.div
                className="flex flex-1 flex-col gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex flex-col gap-2">
                    <motion.h1
                        className="text-2xl font-light text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Hi, I'm what happens when
                    </motion.h1>

                    <div className="relative">
                        <motion.h2
                            className="bg-gradient-to-r from-primary/90 to-foreground/80 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Satyam Jha
                            <span className="ml-2 inline-block h-[0.8em] w-[2px] animate-blink bg-foreground align-baseline" />
                        </motion.h2>

                        <motion.h3
                            className="text-2xl font-light text-muted-foreground md:text-3xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className="animate-[typing_3s_steps(22,end)] overflow-hidden border-r-2 border-r-foreground pr-1">
                                Full Stack Developer
                            </span>
                        </motion.h3>
                    </div>
                </div>

                <motion.p
                    className="max-w-[600px] text-lg text-foreground/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    A human who somehow became a keyboard addict. I turn caffeine into code,
                    figma files into functional nightmares, and occasionally{' '}
                    <span className="line-through">fix production</span> create value.
                    Not a rockstar engineer - just someone who Googles effectively.
                </motion.p>

                <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Button
                        asChild
                        className="w-fit gap-2 px-6 py-5 text-base backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                        variant="glass"
                    >
                        <Link href="#contact">
                            <Mail className="h-4 w-4" />
                            Let's Argue About Tech
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="glass"
                        className="w-fit gap-2 px-6 py-5 text-base backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                    >
                        <Link href="#projects">
                            See My Mistakes
                            <span className="ml-1">→</span>
                        </Link>
                    </Button>
                </motion.div>

                <motion.div
                    className="flex items-center gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <Link
                        href="https://github.com/satyammjha"
                        target="_blank"
                        className="text-foreground/70 transition-all hover:scale-110 hover:text-foreground"
                    >
                        <Github className="h-6 w-6" />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/satyammjha"
                        target="_blank"
                        className="text-foreground/70 transition-all hover:scale-110 hover:text-foreground"
                    >
                        <Linkedin className="h-6 w-6" />
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                className="hidden flex-1 md:flex"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-muted/20 bg-background/10 backdrop-blur-lg">
                    <motion.div
                        initial={{ scale: 0.9, rotate: -3 }}
                        animate={{ scale: 1, rotate: 3 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                    >
                        <Image
                            src="/pfp.jpg"
                            alt="Satyam Jha - Not an AI"
                            fill
                            className="object-cover h-full w-full rounded-full z-40"
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                50vw "
                            priority
                        />


                    </motion.div>
                    <div className="absolute inset-0 rounded-full border-2 border-white/10 shadow-[inset_0_1px_30px_rgba(255,255,255,0.3)] dark:shadow-[inset_0_1px_30px_rgba(0,0,0,0.3)]" />
                </div>
            </motion.div>
        </section>
    );
}