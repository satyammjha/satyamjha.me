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
  title: 'Satyam Jha | Full-Stack Developer & Technical Architect',
  description: 'Portfolio of Satyam Jha - Full-stack developer specializing in modern web applications, system design, and scalable solutions.',
  keywords: [
    'Full-stack Developer',
    'Technical Architect',
    'Web Development',
    'System Design',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'Satyam Jha | Full-Stack Developer',
    description: 'Building scalable web solutions with modern technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Satyam Jha Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@satyammjha',
    creator: '@satyammjha',
    title: 'Satyam Jha | Full-Stack Developer',
    description: 'Portfolio showcasing technical projects and development expertise',
    images: ['/twitter-og.jpg'],
  },
};


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