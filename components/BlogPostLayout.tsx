'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ThemeToggle from '@/components/ThemeToggle'
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { BlogPostWithContent, BlogPost } from '@/lib/posts'

interface BlogPostLayoutProps {
  post: BlogPostWithContent
  prevPost: BlogPost | null
  nextPost: BlogPost | null
  children: React.ReactNode
}

const BlogPostLayout = ({ post, prevPost, nextPost, children }: BlogPostLayoutProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const [toc, setToc] = useState<{ id: string; level: number; text: string }[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const buildToc = () => {
      const headings = document.querySelectorAll('.prose h2')
      const tocItems: { id: string; level: number; text: string }[] = []

      if (post.tableOfContents && post.tableOfContents.length > 0) {
        post.tableOfContents.forEach((sectionTitle: string) => {
          const heading = Array.from(headings).find(h => h.textContent === sectionTitle)
          if (heading && heading.id) {
            tocItems.push({ id: heading.id, level: 2, text: sectionTitle })
          }
        })
      } else {
        headings.forEach(heading => {
          if (heading.id && heading.textContent) {
            tocItems.push({
              id: heading.id,
              level: parseInt(heading.tagName.substring(1)),
              text: heading.textContent,
            })
          }
        })
      }

      setToc(tocItems)
    }

    const timeoutId = setTimeout(buildToc, 100)
    return () => clearTimeout(timeoutId)
  }, [post])

  useEffect(() => {
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    toc.forEach(item => {
      const elem = document.getElementById(item.id)
      if (elem) observer.observe(elem)
    })

    return () => {
      toc.forEach(item => {
        const elem = document.getElementById(item.id)
        if (elem) observer.unobserve(elem)
      })
    }
  }, [toc])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/blogs')}>
              ← Back to All Posts
            </Button>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <article className="py-16 px-2 md:px-4">
        <div className="max-w-7xl mx-auto flex gap-12">
          <aside className="hidden md:block w-1/5 sticky top-24 self-start">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
              <ul className="space-y-2">
                {toc.map(item => (
                  <li key={item.id} className="truncate">
                    <a
                      href={`#${item.id}`}
                      className={`block transition-colors text-sm leading-relaxed py-1 ${
                        activeId === item.id
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                      title={item.text}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="w-full md:w-4/5">
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  post.featured ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  {post.featured && '★ '}
                  {post.category}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{post.date}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{post.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{post.title}</h1>
              <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {post.excerpt}
              </p>
            </header>

            <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-4 md:p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {children}
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 flex justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <span className="text-lg font-semibold">Share</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
                className="hover:bg-[#1DA1EE] hover:text-white hover:border-[#1DA1EE]"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`, '_blank')}
                className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast({ title: 'Link Copied!', description: 'The post URL has been copied to your clipboard.' })
                }}
              >
                <LinkIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-12 flex justify-between">
              <Button variant="outline" onClick={() => router.push('/blogs')} className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                ← Back to All Posts
              </Button>
              <div className="flex gap-2">
                {prevPost && (
                  <Button variant="outline" onClick={() => router.push(`/blogs/${prevPost.slug}`)}>
                    ← Previous
                  </Button>
                )}
                {nextPost && (
                  <Button variant="outline" onClick={() => router.push(`/blogs/${nextPost.slug}`)}>
                    Next →
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlogPostLayout
