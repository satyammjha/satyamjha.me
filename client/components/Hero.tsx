'use client'

import { Github, Linkedin, Terminal, Twitter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import TerminalBackground from "./TerminalBackground"
import { leetcode } from "./icons"
import ResumeDownload from "./Resume"

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden px-4 sm:px-6 md:px-8 mt sm:mt-0">
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
                    <motion.div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 font-mono"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Terminal className="h-4 w-4 text-teal-400 lg:h-5 lg:w-5 motion-safe:animate-pulse" />
                            <span className="text-sm tracking-wide text-teal-400/90 lg:text-base">
                                Systems Architect
                            </span>
                        </motion.div>

                        <motion.h1
                            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex flex-col space-y-3 sm:space-y-4">
                                <span className="bg-gradient-to-r from-purple-400 to-primary bg-clip-text text-transparent">
                                    Code Alchemist
                                </span>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-sm leading-tight tracking-tight text-primary shadow-sm sm:text-base md:px-3 md:py-1.5">
                                            {"<techDebt/>"}
                                        </span>
                                        <span className="text-primary/60 text-xl sm:text-2xl md:text-3xl">⇒</span>
                                        <span className="rounded-md border border-teal-400/20 bg-teal-400/5 px-2.5 py-1 font-mono text-sm leading-tight tracking-tight text-teal-400 shadow-sm sm:text-base md:px-3 md:py-1.5">
                                            cleanCode()
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="max-w-xl text-balance text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed md:max-w-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Transforming <span className="font-semibold text-purple-400">complex systems</span> into{" "}
                            <span className="font-semibold text-teal-400">scalable solutions</span>. Specializing in{" "}
                            <span className="rounded-md border border-primary/20 bg-primary/5 px-1.5 py-0.5 font-mono text-sm tracking-tight text-primary shadow-sm">
                                fullStack()
                            </span>{" "}
                            architecture and{" "}
                            <span className="rounded-md border border-teal-400/20 bg-teal-400/5 px-1.5 py-0.5 font-mono text-sm tracking-tight text-teal-400 shadow-sm">
                                {"<cleanCode/>"}
                            </span>{" "}
                            practices.
                        </motion.p>

                        {/* CTAs */}
                        <div className="flex gap-1 sm:flex-row sm:items-center">
                            <motion.div
                                className="flex"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <ResumeDownload />
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-3 sm:gap-4 ml-2 sm:ml-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                {[
                                    { icon: Github, href: "https://github.com/satyammjha", color: "purple", label: "GitHub" },
                                    { icon: Linkedin, href: "https://linkedin.com/in/satyammjha", color: "teal", label: "LinkedIn" },
                                    { icon: Twitter, href: "https://x.com/satyammjha", color: "pink", label: "Twitter" },
                                    { icon: leetcode, href: "https://leetcode.com/satyammjha/", color: "blue", label: "LeetCode" },
                                ].map(({ icon: Icon, href, color, label }, index) => (
                                    <Link
                                        key={index}
                                        href={href}
                                        target="_blank"
                                        className={`group relative text-foreground/70 transition-colors hover:text-${color}-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${color}-400/50`}
                                        aria-label={`Visit ${label} profile`}
                                    >
                                        <div className={`absolute -inset-2 rounded-full bg-${color}-400/10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100`} />
                                        <Icon className="h-6 w-6 transition-transform hover:scale-110 sm:h-7 sm:w-7" />
                                    </Link>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Terminal Display */}
                    <motion.div
                        className="flex items-center justify-center order-last md:order-none mt-8 md:mt-0"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <TerminalBackground className="w-full max-w-[90vw] sm:max-w-[75vw] md:max-w-[45vw] lg:max-w-[40vw] xl:max-w-[35vw]" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}