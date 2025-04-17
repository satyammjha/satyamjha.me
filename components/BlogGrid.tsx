import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  excerpt?: string
  date: string
  image?: string
}

export function BlogGrid({ blogs }: { blogs: BlogCardProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blog/${blog.slug}`}
          className="group block hover:no-underline"
        >
          <article className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">

            <div className="relative aspect-video bg-muted/50">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg text-black font-semibold mb-2 group-hover:text-primary transition-colors">
                {blog.title}
              </h3>

              {blog.excerpt && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {blog.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <time>
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}