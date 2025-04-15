'use client'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPreview {
  slug: string
  title?: string
  date?: string
  category?: string
  image?: string
}

interface SuggestedReadsProps {
  blogs: BlogPreview[]
}

export function SuggestedReads({ blogs }: SuggestedReadsProps) {
  return (
    <Card className="p-6 bg-muted/10 border-none">
      <h3 className="text-lg font-semibold mb-4">Suggested Reads</h3>
      <div className="space-y-6">
        {blogs.map(blog => (
          <Link 
            key={blog.slug} 
            href={`/blog/${blog.slug}`} 
            className="group block hover:no-underline"
          >
            <div className="mb-2 rounded-lg overflow-hidden border bg-muted/20 aspect-video">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title || 'Blog post'}
                  width={320}
                  height={180}
                  className="w-full object-cover aspect-video transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            {blog.category && (
              <span className="text-sm text-primary">{blog.category}</span>
            )}
            <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
              {blog.title || 'Untitled Post'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {blog.date ? new Date(blog.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : 'Date NA'}
            </p>
          </Link>
        ))}
      </div>
    </Card>
  )
}