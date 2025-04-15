import "@/styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Preloader } from "@/components/Preloader"
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { RouteChangeLoader } from "@/components/RouteChangerLoader"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RouteChangeLoader />
          <Preloader /> 
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}