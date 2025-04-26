import BlogPage from '@/components/BlogPage'
import { allBlogs } from '../../../public/data/blogs'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.slug }))
}

export default async function BlogBySlug({ params }: Props) {
  // ① await the params promise
  const { slug } = await params

  // ② decode and find the blog
  const decodedSlug = decodeURIComponent(slug)
  const blog = allBlogs.find((b) => b.slug === decodedSlug)
  if (!blog) return notFound()

  const suggestedBlogs = allBlogs
    .filter((b) => b.slug !== decodedSlug)
    .slice(0, 3)
    .map((b) => ({
      slug: b.slug,
      title: b.title || 'NA',
      date: b.date || new Date().toISOString(),
      category: b.category || 'General',
      image: b.image || '/default-blog.jpg',
    }))

  return <BlogPage {...blog} suggestedBlogs={suggestedBlogs} />
}
