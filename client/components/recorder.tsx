"use client";

import { useState, useEffect } from "react";
import { Mic, X, Send, RefreshCw } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ToastAction } from "./ui/toast";
import { useToast } from "@/hooks/use-toast";

const MAIN_MESSAGES = [
    "I’ll pretend to care… with *style*",
    "Your voice is my *absolute* favorite… (said every text-to-speech app ever)",
    "Ready to record your masterpiece? 🎙️🔫",
    "I’m legally required to say I respect your privacy*",
    "Voice notes: Because typing is *so* 2023",
    "Wow, you found the mic button! 🏆",
];

const RECORDING_MESSAGES = [
    "Keep talking… *subtle glance at stop button*",
    "This better be Nobel Prize material…",
    "*Mental note*: Add 'endless voice memo' to list of fears",
    "Enthralling. Truly. *Checks imaginary watch*",
    "Plot twist: I’m just miming recording 🎭",
    "Still going? How… *brave* of you 🎙️😒",
];

export default function VoiceRecorderSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioLength, setAudioLength] = useState(0);
    const [waveformData, setWaveformData] = useState<number[]>([]);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [currentRecordingMessage, setCurrentRecordingMessage] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const { toast } = useToast()

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

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const TITLES = [
        "Voice Jail",
        "Your Audio Diary (We’re Judging)",
        "Noise Pollution",
        "Monologue Maker"
    ];

    const [currentTitle, setCurrentTitle] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitle(prev => (prev + 1) % TITLES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            const interval = setInterval(() => {
                setCurrentMessage(prev => (prev + 1) % MAIN_MESSAGES.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (status === "recording") {
            const interval = setInterval(() => {
                setCurrentRecordingMessage(prev => (prev + 1) % RECORDING_MESSAGES.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [status]);

    const handleRecording = () => {
        if (!isRecording) {
            startRecording();
            setIsRecording(true);
            setAudioLength(0);
            setWaveformData(Array(100).fill(0).map(() => Math.random() * 0.8 + 0.2));
        } else {
            stopRecording();
        }
    };

    const handleReset = () => {
        clearBlobUrl();
        setIsRecording(false);
        setAudioLength(0);
        setWaveformData([]);
        setEmail("");
        setEmailError("");
    };

    const handleSend = async () => {
        if (!email) {
            setEmailError("Email is required... obviously.");
            return;
        }
        if (!validateEmail(email)) {
            setEmailError("Nice try, but that's not a real email.");
            return;
        }
        setIsSending(true);
        try {
            if (!mediaBlobUrl) {
                throw new Error("No mediaBlobUrl available for fetching.");
            }
            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
            const file = new File([blob], "voice-note.webm", { type: blob.type });

            const formData = new FormData();
            formData.append("email", email);
            formData.append("audio", file);

            await axios.post("https://api.satyamjha.me/sendNote", formData);
            setIsSending(false);
            setIsModalOpen(false);
            toast({
                title: "✅ Voice Note Sent!",
                description: "We’ll get back to you soon.",
            });
            handleReset();
        } catch (error) {
            console.error("Error sending voice note:", error);
            setEmailError("Failed to send. Try again?");
        }
    };

    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setAudioLength(prev => prev + 1);
                setWaveformData(prev => {
                    const newData = [...prev, Math.random() * 0.8 + 0.2];
                    return newData.slice(-100);
                });
            }, 150);
            return () => clearInterval(interval);
        }
    }, [isRecording]);

    useEffect(() => {
        if (!isModalOpen) handleReset();
    }, [isModalOpen]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <section className="flex items-center justify-center py-16 px-4 relative overflow-hidden">

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="absolute w-64 h-64 border-2 border-primary/20 rounded-full"
                        style={{
                            animation: `wave-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                            animationDelay: `${i * 0.5}s`,
                            transform: `scale(${1 + i * 0.2})`,
                            opacity: 1 - i * 0.3
                        }}
                    />
                ))}
            </div>

            <div className="text-center space-y-5 w-full max-w-md relative z-10">
                <h2 className="text-2xl font-medium text-foreground">
                    {TITLES[currentTitle]}
                </h2>

                <div
                    className="relative mx-auto cursor-pointer group"
                    onClick={() => setIsModalOpen(true)}
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto relative">
                        <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping group-hover:animate-none opacity-70"></div>
                        <div className="absolute w-12 h-12 rounded-full border border-primary/30 group-hover:scale-110 transition-transform duration-300"></div>
                        <Mic className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground min-h-[20px]">
                        {MAIN_MESSAGES[currentMessage]}
                    </p>
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-lg rounded-xl border-none shadow-lg p-0 overflow-hidden w-full">
                        <div className="bg-gradient-to-b from-background to-background/95 backdrop-blur-sm px-4 pt-4 pb-5">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-sm font-medium text-foreground">
                                        {status === "recording" ? "Recording..." : mediaBlobUrl ? "Preview" : "Ready to record"}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {status === "recording"
                                            ? RECORDING_MESSAGES[currentRecordingMessage]
                                            : mediaBlobUrl
                                                ? "That's the masterpiece? Hmm."
                                                : "I’m waiting... again."}
                                    </div>
                                </div>

                            </div>

                            <div className="relative mb-6">
                                {status === "recording" && (
                                    <div className="flex items-end justify-between h-16 gap-0 mb-2 overflow-hidden w-full">
                                        {waveformData.map((value, index) => (
                                            <div
                                                key={index}
                                                className="bg-primary transition-all duration-150 ease-in-out"
                                                style={{
                                                    height: `${value * 100}%`,
                                                    width: `${100 / waveformData.length}%`,
                                                    opacity: (0.3 + (index / waveformData.length) * 0.7),
                                                    transform: `scaleY(${0.8 + Math.sin(Date.now() / 200 + index * 0.3) * 0.2})`
                                                }}
                                            />
                                        ))}
                                        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background w-full h-full pointer-events-none" />
                                    </div>
                                )}

                                {mediaBlobUrl && !isRecording && (
                                    <div className="w-full mb-4 space-y-4">
                                        <audio
                                            src={mediaBlobUrl}
                                            controls
                                            className="w-full h-12 rounded"
                                            controlsList="nodownload noplaybackrate"
                                        />
                                        <div className="space-y-2">
                                            <input
                                                type="email"
                                                placeholder="Enter your email... if you must"
                                                className={`w-full px-4 py-2 rounded-lg border ${emailError ? "border-red-500" : "border-muted"
                                                    } bg-background/80 focus:ring-2 focus:ring-primary/50`}
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setEmailError("");
                                                }}
                                            />
                                            {emailError && (
                                                <p className="text-red-500 text-xs text-left animate-shake">
                                                    {emailError}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* {status === "recording" && (
                                    <div className="text-xs text-primary font-medium text-center">
                                        {formatTime(audioLength)}
                                    </div>
                                )} */}
                            </div>

                            <div className="flex justify-center gap-3">
                                {mediaBlobUrl && !isRecording ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            aria-label="Reset"
                                            onClick={handleReset}
                                            className="rounded-full h-10 px-4 border-muted-foreground/20"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Retry
                                        </Button>
                                        <Button
                                            onClick={handleSend}
                                            aria-label="Send"
                                            className="rounded-full h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            {isSending ? "Sending..." : "Send"}
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={handleRecording}
                                        className={cn(
                                            "rounded-full h-12 w-12 flex items-center justify-center transition-all",
                                            status === "recording"
                                                ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                                                : "bg-primary text-primary-foreground hover:bg-primary/90"
                                        )}
                                        aria-label={status === "recording" ? "Stop Recording" : "Start Recording"}
                                    >
                                        {status === "recording" ? (
                                            <span className="w-3 h-3 rounded bg-white animate-pulse" />
                                        ) : (
                                            <Mic className="w-5 h-5" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <style jsx global>{`
                @keyframes wave-pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake {
                    10%, 90% { transform: translateX(-1px); }
                    20%, 80% { transform: translateX(2px); }
                    30%, 50%, 70% { transform: translateX(-3px); }
                    40%, 60% { transform: translateX(3px); }
                }
            `}</style>
        </section>
    );
}