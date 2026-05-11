'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/ThemeToggle'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { BlogPost } from '@/lib/posts'

interface BlogsClientProps {
  posts: BlogPost[]
}

const BlogsClient = ({ posts }: BlogsClientProps) => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/" className="text-lg font-semibold">← Back to Portfolio</Link>
            </Button>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">All Stories & Insights</h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore all my thoughts on education, technology, and the art of creative expression.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.slug}
                className="blog-card animate-fade-in group cursor-pointer transition-all duration-300 hover:border-primary flex flex-col"
                style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                onClick={() => router.push(`/blogs/${post.slug}`)}
              >
                <CardHeader className="flex-grow">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.featured ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      {post.featured && '★ '}
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300 text-lg">
                    {post.title}
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 transition-colors">
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground">© 2024 Krishna Neupane.</div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.facebook.com/itskr1shna/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</a>
            <a href="https://github.com/akrrishna" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</a>
            <a href="mailto:npkrishnahere@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogsClient
