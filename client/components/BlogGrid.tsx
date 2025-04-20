import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays } from 'lucide-react';

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  image?: string;
}

interface BlogGridProps {
  blogs: BlogCardProps[];
}

function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Link
          key={blog.slug}
          href={`/blog/${blog.slug}`}
          className="group block hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg transition-all hover:scale-[1.02] active:scale-100"
        >
          <article className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:border-gray-700 bg-white dark:bg-gray-800">
           
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 p-10">
              {blog.image ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover p-10"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    priority={false}
                    style={{
                      objectPosition: 'center center',
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground dark:text-gray-400">
                  <span className="text-sm">No Image Available</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>

              {blog.excerpt && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CalendarDays className="w-4 h-4 flex-shrink-0" />
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
  );
}

export default BlogGrid;