'use client'

import Image from 'next/image'
import Head from 'next/head'
import { CalendarDays } from 'lucide-react'
import { SuggestedReads } from '@/components/suggestedReads'

interface BlogProps {
  slug: string
  title?: string
  content?: string
  date?: string
  image?: string
  suggestedBlogs?: Array<{
    slug: string
    title?: string
    date?: string
    category?: string
    image?: string
  }>
}

export default function BlogPage({
  slug,
  title = 'NA',
  content = 'No content available',
  date = new Date().toISOString(),
  image,
  suggestedBlogs
}: BlogProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const excerpt = content.split('\n').find((line) => line.trim().length > 50) || 'Blog post by Satyam Jha.'

  return (
    <>
      <Head>
        <title>{title} | Satyam Jha</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        {/* {image && <meta property="og:image" content={image} />} */}
        <meta name="author" content="Satyam Jha" />
      </Head>

      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto px-4 py-8 md:py-12">

        <div className="flex-1">
          <article className="mb-8 md:mb-12">
            <div className="mb-4 md:mb-6 space-y-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {formattedDate}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
                {title}
              </h1>
            </div>

            {/* {image ? (
              <div className="mb-6 md:mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 max-w-[800px] mx-auto">
                <Image
                  src={image}
                  alt={title}
                  width={800}
                  height={450}
                  className="w-full object-cover aspect-video"
                  priority
                />
              </div>
            ) : (
              <div className="mb-6 md:mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-muted/20 dark:bg-muted/30 aspect-video flex items-center justify-center max-w-[800px] mx-auto">
                <span className="text-muted-foreground">No Image Available</span>
              </div>
            )} */}

            <div className="prose prose-invert max-w-none text-black dark:text-white text-lg leading-relaxed">
              {content.split('\n').map((line, i) => (
                <p key={i} className="mb-4">{line || <br />}</p>
              ))}
            </div>
          </article>
        </div>

        {suggestedBlogs && suggestedBlogs.length > 0 && (
          <div className="lg:block w-full lg:w-80 space-y-8 mt-8 lg:mt-0">
            <SuggestedReads blogs={suggestedBlogs} />
          </div>
        )}
      </div>
    </>
  )
}