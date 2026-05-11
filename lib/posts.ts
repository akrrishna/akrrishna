import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  featured: boolean
  readTime: string
  tableOfContents?: string[]
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace('.mdx', '')
      const fullPath = path.join(postsDirectory, fileName)
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'))
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
        category: data.category || 'General',
        featured: data.featured || false,
        readTime: data.readTime || '5 min read',
        tableOfContents: data.tableOfContents,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    excerpt: data.excerpt || '',
    category: data.category || 'General',
    featured: data.featured || false,
    readTime: data.readTime || '5 min read',
    tableOfContents: data.tableOfContents,
    content,
  }
}
