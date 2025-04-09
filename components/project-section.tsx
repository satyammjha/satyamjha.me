"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col group overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={index === 0}
                                    />
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="outline"
                                                className="text-sm font-mono px-3 py-1"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-3 mt-auto">
                                        {project.repo && (
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <Link href={project.repo} target="_blank">
                                                    <Github className="h-4 w-4" />
                                                    Repository
                                                </Link>
                                            </Button>
                                        )}

                                        {project.liveLink && (
                                            <Button
                                                asChild
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <Link href={project.liveLink} target="_blank">
                                                    Live Demo
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