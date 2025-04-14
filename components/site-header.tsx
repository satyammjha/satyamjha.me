import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-300/50 backdrop-blur-lg transition-all duration-300 bg-white/80 dark:border-slate-50/10 dark:bg-slate-950/80">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <MainNav items={siteConfig.mainNav} />

        <div className="flex flex-1 justify-center">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors",
              })}
            >
              <Icons.gitHub className="h-4 w-4 sm:h-5 sm:w-5 hover:scale-110 transition-transform" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors",
              })}
            >
              <Icons.linkedin className="h-4 w-4 sm:h-5 sm:w-5 hover:scale-110 transition-transform" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors",
              })}
            >
              <Icons.twitter className="h-4 w-4 sm:h-5 sm:w-5 fill-current hover:scale-110 transition-transform" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href={siteConfig.links.leetcode}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors",
              })}
            >
              <Icons.leetcode className="h-4 w-4 sm:h-5 sm:w-5 hover:scale-110 transition-transform" />
              <span className="sr-only">LeetCode</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}