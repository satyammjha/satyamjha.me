import Link from "next/link";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t bg-transparent mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Branding */}
          <div className="space-y-1">
            <h2 className="text-sm font-light tracking-wide text-muted-foreground">
              satyammjha
            </h2>
            <div className="h-px w-8 mx-auto bg-border/50" />
            <p className="text-xs text-muted-foreground/80 font-light">
              Designing digital futures
            </p>
          </div>

          {/* GitHub Link */}
          <Link
            href="https://github.com/satyammjha"
            target="_blank"
            aria-label="GitHub Profile"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <div className="p-2 rounded-full border hover:border-foreground/20 transition-all duration-300">
              <Github className="h-4 w-4 text-muted-foreground group-hover:text-foreground/90 transition-colors" />
            </div>
          </Link>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground/60 font-light">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;