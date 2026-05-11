import { getAllPosts } from '@/lib/posts'
import BlogsClient from '@/components/BlogsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Krishna Neupane',
  description: 'Explore all my thoughts on education, technology, and the art of creative expression.',
}

export default function BlogsPage() {
  const posts = getAllPosts()
  return <BlogsClient posts={posts} />
}
