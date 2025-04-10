import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              satyammjha - creating future of digital experiences
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>View source on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}