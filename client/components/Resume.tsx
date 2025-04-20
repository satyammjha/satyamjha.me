'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react';

export default function ResumeDownload() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="gap-2 group">
                    <DownloadIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    View Resume
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl h-[80vh] sm:max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>My Resume</DialogTitle>
                    <DialogDescription>
                        Available for download in PDF format
                    </DialogDescription>
                </DialogHeader>

                <div className="h-full flex flex-col gap-4">
                    <div className="flex-1 overflow-hidden rounded-lg border bg-muted/20 relative">
                        <object
                            data="/data/satyam.pdf#view=FitH"
                            type="application/pdf"
                            className="w-full h-full min-h-[300px]"
                            aria-label="Resume document preview"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <p className="text-muted-foreground mb-4">
                                    Unable to view PDF? 
                                </p>
                                <Button asChild variant="secondary">
                                    <a
                                        href="https://drive.google.com/file/d/1E9AypFF2uHAceX-DINpMs4u3tKAFKUp1/view?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="gap-2"
                                    >
                                        <ExternalLinkIcon className="w-4 h-4" />
                                        Open in PDF Viewer
                                    </a>
                                </Button>
                            </div>
                        </object>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                        <p className="text-sm text-muted-foreground">
                            For best experience on mobile, download the PDF
                        </p>
                        <div className="flex gap-4 w-full sm:w-auto">
                            <Button
                                variant="secondary"
                                onClick={() => setIsOpen(false)}
                                className="w-full sm:w-auto"
                            >
                                Close
                            </Button>
                            <Button asChild className="w-full sm:w-auto">
                                <a
                                    href="/data/satyam.pdf"
                                    download="Satyam_Resume.pdf"
                                    className="gap-2"
                                >
                                    <DownloadIcon className="w-4 h-4" />
                                    Download PDF
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}