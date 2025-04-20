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
  title: 'Satyam Jha | Full-Stack Developer & Technical Architect',
  description: 'Explore the portfolio of Satyam Jha, a full-stack developer and technical architect specializing in MERN stack, cloud infrastructure, scalable systems, and impactful digital experiences.',
  keywords: [
    'Satyam Jha',
    'Full-Stack Developer',
    'Technical Architect',
    'MERN Stack',
    'Web Developer Portfolio',
    'React Developer',
    'Node.js Developer',
    'Cloud Developer',
    'System Design',
    'Scalable Applications',
    'Software Engineer',
    'Portfolio Website',
  ],
  authors: [{ name: 'Satyam Jha', url: 'https://satyamjha.me' }],
  creator: 'Satyam Jha',
  publisher: 'Satyam Jha',
  openGraph: {
    title: 'Satyam Jha | Full-Stack Developer & Technical Architect',
    description:
      'Hi, I’m Satyam Jha. I build fast, modern, and scalable web applications. Explore my portfolio, projects, and technical blog.',
    url: 'https://satyamjha.me',
    siteName: 'Satyam Jha Portfolio',
    images: [
      {
        url: 'https://satyamjha.me/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Satyam Jha Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Satyam Jha | Full-Stack Developer',
    description:
      'Explore the work and projects of Satyam Jha — Full-stack developer crafting impactful, scalable web experiences.',
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