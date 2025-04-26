import "@/styles/globals.css";
import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import Background from "@/components/Background";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  title: 'Satyam Jha (satyammjha) | Full-Stack Developer & Technical Architect',
  description: 'Discover Satyam Jha (satyammjha) — a full-stack developer and technical architect specializing in MERN stack, cloud engineering, scalable systems, and creating high-impact digital experiences.',
  keywords: [
    'Satyam Jha',
    'satyammjha',
    'Full-Stack Developer',
    'Technical Architect',
    'MERN Stack Developer',
    'Cloud Developer',
    'React Developer',
    'Node.js Developer',
    'System Design',
    'Web Developer Portfolio',
    'Scalable Applications',
    'Software Engineer',
    'Portfolio Website',
    'Technical Blog',
    'Open Source Developer',
  ],
  authors: [{ name: 'Satyam Jha (satyammjha)', url: 'https://satyamjha.me' }],
  creator: 'Satyam Jha (satyammjha)',
  publisher: 'Satyam Jha',
  openGraph: {
    title: 'Satyam Jha (satyammjha) | Full-Stack Developer & Architect',
    description: 'Hi, I’m Satyam Jha (satyammjha), building modern, fast, and scalable web applications. Explore my portfolio, technical blog, and projects across cloud and full-stack development.',
    url: 'https://satyamjha.me',
    siteName: 'Satyam Jha | satyammjha Portfolio',
    images: [
      {
        url: 'https://satyamjha.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Satyam Jha | satyammjha Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Satyam Jha (satyammjha) | Full-Stack Developer & Architect',
    description: 'Explore the projects and blogs by Satyam Jha (satyammjha) — building impactful and scalable digital products using MERN stack, cloud, and modern web technologies.',
    creator: '@satyammjha',
  },
  metadataBase: new URL('https://satyamjha.me'),
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SiteHeader />
          <Background />
          <Preloader />
          <main className="flex-1 md:px-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}