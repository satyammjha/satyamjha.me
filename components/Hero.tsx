'use client'

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Terminal, Twitter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import TerminalBackground from "./TerminalBackground"
import { leetcode } from "./icons"
import ResumeDownload from "./Resume"

export default function Hero() {
    return (
        <section className="container relative flex min-h-screen items-center overflow-hidden px-7 sm:py-7 sm:px-8">
            <div className="absolute inset-0 -z-30 bg-[url('/grid.svg')] bg-repeat opacity-[3%]" />
            <div className="absolute left-1/4 top-1/3 -z-20 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-purple-500/20 to-primary/30 blur-[100px]" />
            <div className="absolute right-1/4 top-2/3 -z-20 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-teal-400/20 to-primary/30 blur-[80px]" />

            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">

                <motion.div
                    className="flex flex-col justify-center space-y-6 md:space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-3 font-mono text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Terminal className="h-5 w-5 text-teal-400" />
                        <span className="text-lg tracking-wide text-teal-400/90">Full Stack Architect</span>
                    </motion.div>

                    <motion.h1
                        className="font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="bg-gradient-to-r from-purple-400 to-primary bg-clip-text text-transparent">
                            Transforming
                        </span>
                        <br />
                        <span className="text-foreground/90">Complex Problems</span>
                        <span className="mx-3 text-3xl text-primary/60 sm:text-4xl">→</span>
                        <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                            Elegant Solutions
                        </span>
                    </motion.h1>

                    <motion.p
                        className="max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Bridging the gap between <span className="font-semibold text-purple-400">logic</span> and{" "}
                        <span className="font-semibold text-teal-400">creativity</span>. Expert in decoding{" "}
                        <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-sm tracking-wide text-primary shadow-sm">
                            {"<techDebt/>"}
                        </span>{" "}
                        into{" "}
                        <span className="rounded-md border border-teal-400/20 bg-teal-400/5 px-2 py-1 font-mono text-sm tracking-wide text-teal-400 shadow-sm">
                            cleanCode();
                        </span>
                    </motion.p>
                    <div className="flex sm:flex-col flex-row gap-4">
                        <motion.div
                            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <ResumeDownload />
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-5 pt-6 md:pt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {[
                                { icon: Github, href: "https://github.com/satyammjha", color: "purple" },
                                { icon: Linkedin, href: "https://linkedin.com/in/satyammjha", color: "teal" },
                                { icon: Twitter, href: "https://x.com/satyammjha", color: "pink" },
                                { icon: leetcode, href: "https://leetcode.com/satyammjha/", color: "blue" },
                            ].map(({ icon: Icon, href, color }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    className={`group relative text-foreground/70 transition-all hover:text-${color}-400`}
                                    aria-label={`${Icon.displayName} profile`}
                                >
                                    <div className={`absolute -inset-2 rounded-full bg-${color}-400/10 opacity-0 transition-opacity group-hover:opacity-100`} />
                                    <Icon className="h-6 w-6 transition-transform group-hover:scale-110 sm:h-7 sm:w-7" />
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <TerminalBackground />

        </section >
    )
}