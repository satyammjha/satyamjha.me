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
import { DownloadIcon } from 'lucide-react';

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

            <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle>My Resume</DialogTitle>
                    <DialogDescription>
                        Available for download in PDF format
                    </DialogDescription>
                </DialogHeader>

                <div className="h-full overflow-hidden rounded-lg border bg-muted/20">
                    <iframe
                        src="/data/satyam.pdf"
                        className="w-full h-[90vh]"
                        title="Resume Preview"
                        aria-label="Resume document preview"
                        loading="lazy"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        onClick={() => setIsOpen(false)}
                    >
                        Close
                    </Button>
                    <Button asChild>
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
            </DialogContent>
        </Dialog>
    );
}