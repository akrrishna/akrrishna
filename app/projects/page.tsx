import { projects } from '@/lib/data'
import ProjectsClient from '@/components/ProjectsClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Krishna Neupane',
  description: 'Explore all my projects, from web applications to educational platforms.',
}

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />
}
