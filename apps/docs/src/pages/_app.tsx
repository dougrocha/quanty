/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/globals.css'

import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import CustomLink from '../components/a'
import CustomImage from '../components/img'

const components = {
  img: CustomImage,
  a: CustomLink,
}

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={components as never}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default MyApp
