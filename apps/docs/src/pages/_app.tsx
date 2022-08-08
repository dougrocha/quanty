/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/globals.css'

import { MDXProvider } from '@mdx-js/react'
import type { AppProps } from 'next/app'

import CustomLink from '../components/a'
import CustomImage from '../components/img'

const components = {
  img: CustomImage,
  a: CustomLink,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components as never}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default MyApp
