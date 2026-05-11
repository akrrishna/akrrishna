'use client'

import { CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { projects } from '@/lib/data'

const FeaturedProjects = () => {
  const router = useRouter()
  const featuredProjects = projects.filter(project => project.featured)

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Here are some of the projects I&apos;ve worked on so far. I&apos;m continuously learning and excited to share more as I grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex flex-col h-full rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary overflow-hidden animate-fade-in"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex-grow">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 line-clamp-3">
                    {project.description}
                  </CardDescription>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tech.map(tech => (
                      <span key={tech} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-primary/10 transition-colors -ml-4"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      View Project →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="animate-fade-in hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            style={{ animationDelay: '0.8s' }}
            onClick={() => router.push('/projects')}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
