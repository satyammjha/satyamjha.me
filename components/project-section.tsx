"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "expressEys - NPM Package",
        description: "A plug-and-play Express.js middleware to monitor and log request performance with alerting system.",
        tech: ["Express.js", "TypeScript", "NPM", "Node.js"],
        image: "/expresseye.jpg",
        repo: "https://github.com/satyammjha/expressEys",
        liveLink: "https://www.npmjs.com/package/expresseys"
    },
    {
        title: "SitePulse - Website Uptime Monitoring",
        description: "Track uptime/downtime of websites in real-time using WebSockets, with validator support and analytics.",
        tech: ["Next.js", "MongoDB", "WebSockets", "Auth0", "Node.js"],
        image: "/dashboard.png",
        repo: "https://github.com/satyammjha/SitePulse",
    },
    {
        title: "Jeevani - Medical Tracker App",
        description: "A health & medicine reminder app built with React Native for better medication adherence.",
        tech: ["React Native", "Firebase", "Push Notifications", "AsyncStorage"],
        image: "/jeevani.jpg",
        repo: "https://github.com/satyammjha/Jeevani---HDIMS",
    },
    {
        title: "CU Auto Login - Chrome Extension",
        description: "A Chrome Extension that automates the login process for CUCHD’s Academics Manager portal, including auto-filling credentials and bypassing captcha using AI. Built to save time and make daily logins effortless.",
        tech: ["JavaScript", "Chrome Extension APIs", "Hugging Face", "AI Captcha Solver", "LocalStorage"],
        image: "/cu-auto-login.jpg",
        repo: "https://github.com/satyammjha/cu-auto-login-extension",
    }
];

export function ProjectsSection() {
    return (
        <section className="py-16 px-4 md:px-8">
            <div className="container max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-3xl font-bold text-center mb-12"
                >
                    Featured Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "row-span-1 rounded-xl group",
                                index === 0 ? "md:col-span-2 md:row-span-2" : "",
                                index === 1 ? "md:row-span-2" : "",
                                index === 3 ? "md:col-span-2" : ""
                            )}
                        >
                            <Card className="h-full flex flex-col group overflow-hidden hover:shadow-lg transition-shadow relative">
                                <div className="relative h-full overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs md:text-sm line-clamp-2 mb-3 md:mb-4 opacity-90">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.slice(0, 3).map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="text-[0.65rem] md:text-xs font-mono px-2 py-1 bg-black/40 backdrop-blur-md border-transparent"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute top-3 right-3 flex gap-2">
                                        {project.repo && (
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                                className="rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 text-white h-8 w-8 p-0"
                                            >
                                                <Link href={project.repo} target="_blank">
                                                    <Github className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        )}
                                        {project.liveLink && (
                                            <Button
                                                asChild
                                                size="sm"
                                                className="rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 text-white h-8 w-8 p-0"
                                            >
                                                <Link href={project.liveLink} target="_blank">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}