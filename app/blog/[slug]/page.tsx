import BlogPage from '@/components/BlogPage'
import { allBlogs } from '../../../data/blogs'
import { notFound } from 'next/navigation'

interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    return allBlogs.map((blog) => ({
        slug: blog.slug
    }))
}

export default function BlogBySlug({ params }: Props) {
    const decodedSlug = decodeURIComponent(params.slug)
    const blog = allBlogs.find((b) => b.slug === decodedSlug)

    if (!blog) return notFound()

    const suggestedBlogs = allBlogs
        .filter(b => b.slug !== decodedSlug)
        .slice(0, 3)
        .map(blog => ({
            slug: blog.slug,
            title: blog.title || 'NA',
            date: blog.date || new Date().toISOString(),
            category: blog.category || 'General',
            image: blog.image || '/default-blog.jpg'
        }))

    return <BlogPage {...blog} suggestedBlogs={suggestedBlogs} />
}