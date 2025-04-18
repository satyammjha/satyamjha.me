import Link from "next/link";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">

          <div className="space-y-1">
            <h2 className="text-sm font-medium">satyammjha</h2>
            <p className="text-xs text-muted-foreground">
            creating future of digital experiences
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">

            <Link
              href="https://github.com/satyammjha/satyamjha.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>Star on GitHub</span>
            </Link>
          </div>
        </div>

        <div className="mt-4 border-t pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;