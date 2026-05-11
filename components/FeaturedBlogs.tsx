'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/lib/posts'

interface FeaturedBlogsProps {
  featuredPosts: BlogPost[]
}

const FeaturedBlogs = ({ featuredPosts }: FeaturedBlogsProps) => {
  const router = useRouter()

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            A growing collection of my personal thoughts and reflections — written straight from the heart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.slug}
              className="blog-card animate-fade-in group cursor-pointer transition-all duration-300 hover:border-primary flex flex-col"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
              onClick={() => router.push(`/blogs/${post.slug}`)}
            >
              <CardHeader className="flex-grow">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base">{post.excerpt}</CardDescription>
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

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="animate-fade-in hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            style={{ animationDelay: '0.8s' }}
            onClick={() => router.push('/blogs')}
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedBlogs
