import { MDXProvider } from '@mdx-js/react'
import { useEffect, useState } from 'react'

import CustomLink from '../components/typography/a'
import CustomImage from '../components/typography/img'

const components = {
  img: CustomImage,
  a: CustomLink,
}

interface LayoutProps {
  children: React.ReactNode
  meta?: Record<string, unknown>
}

export const DocsLayout = ({ children, meta }: LayoutProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <MDXProvider components={components as never}>
      <div className="flex h-screen flex-col">
        <div className="prose h-full w-full bg-blue-500 dark:prose-invert">
          {children}
        </div>
      </div>
    </MDXProvider>
  )
}
