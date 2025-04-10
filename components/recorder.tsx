"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, X, Send, RefreshCw, Waves } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function VoiceRecorderSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const {
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl,
        status,
    } = useReactMediaRecorder({
        audio: true,
        onStop: () => setIsRecording(false),
    });

    const handleRecording = () => {
        if (!isRecording) {
            startRecording();
            setIsRecording(true);
        } else {
            stopRecording();
        }
    };

    const handleReset = () => {
        clearBlobUrl();
        setIsRecording(false);
    };

    const handleSend = () => {
        console.log("Sending recording:", mediaBlobUrl);
        setIsModalOpen(false);
        handleReset();
    };

    useEffect(() => {
        if (!isModalOpen) handleReset();
    }, [isModalOpen]);
    return (
        <section className="flex items-center justify-center py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                        Voice Command
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        I'm all ears... unless you're just practicing your beatboxing 🎶
                    </p>
                </div>

                <div className="relative flex items-center justify-center h-64 w-64">
                
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 border-2 border-primary/40 rounded-full mx-auto my-auto"
                            style={{
                                width: `${40 + i * 20}%`,
                                height: `${40 + i * 20}%`,
                            }}
                            animate={{
                                scale: [1, 2],
                                opacity: [0.4, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeOut"
                            }}
                        />
                    ))}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-full w-16 h-16 bg-primary text-background hover:scale-105 transition relative z-10"
                    >
                        <motion.div
                            animate={isRecording ? { scale: [1, 1.15] } : {}}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Mic className="w-8 h-8" />
                        </motion.div>
                    </Button>
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-sm rounded-xl bg-popover border border-border p-6">
                        <DialogHeader className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Waves className="w-5 h-5 text-primary" />
                                <DialogTitle className="text-lg text-foreground">
                                    {status === "recording" ? "Listening..." : "Your Masterpiece"}
                                </DialogTitle>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-muted-foreground hover:text-foreground"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </DialogHeader>

                        <div className="text-center space-y-4">
                            <div className="relative">
                                <motion.div
                                    animate={status === "recording" ? { scale: [1, 1.1] } : {}}
                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                >
                                    <Mic className="w-10 h-10 text-primary mx-auto" />
                                </motion.div>

                                {status === "recording" && (
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                                        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                    />
                                )}
                            </div>

                            {mediaBlobUrl ? (
                                <div className="space-y-4">
                                    <audio src={mediaBlobUrl} controls className="w-full rounded-md" />
                                    <div className="flex justify-center gap-3">
                                        <Button
                                            onClick={handleSend}
                                            className="gap-1 bg-primary text-background hover:bg-primary/80"
                                        >
                                            <Send className="w-4 h-4" />
                                            Send Anyway
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={handleReset}
                                            className="gap-1 text-muted-foreground border-border hover:bg-muted"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Try Again
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        It's not too late to reconsider... 😉
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Button
                                        onClick={handleRecording}
                                        className={cn(
                                            "rounded-full px-6 py-3 text-sm font-medium gap-2",
                                            status === "recording"
                                                ? "bg-red-500 text-white hover:bg-red-400"
                                                : "bg-primary text-background hover:bg-primary/80"
                                        )}
                                    >
                                        {status === "recording" ? "Stop" : "Start"} Recording
                                    </Button>
                                    <p className="text-sm text-muted-foreground">
                                        Don't worry, I've heard worse. Probably.
                                    </p>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </section>
    );
}