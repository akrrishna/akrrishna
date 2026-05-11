import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Krishna Neupane - Portfolio',
  description: 'Portfolio of Krishna Neupane - Educator, Web Dev, Content Writer',
  metadataBase: new URL('https://npkrishna.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
