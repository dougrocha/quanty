import { NextSeo } from 'next-seo'
import React from 'react'

import Footer from '../components/Footer/Footer'
import Navbar from '../components/Home/Navbar/Navbar'
import { useAuth } from '../hooks'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  footer?: boolean
}

const BaseLayout = ({
  children,
  title = 'Discord Bot',
  footer,
}: LayoutProps) => {
  useAuth()

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="Quanty | %s"
        defaultTitle="Quanty | Discord Bot"
        description="🤖 Add Quanty to your discord for a makeover. Quanty is a multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard."
        canonical={`${process.env.NEXT_PUBLIC_APP_URL}`}
        openGraph={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_URL}`,
          title: `Quanty | ${title}`,
          description:
            '🤖 Add Quanty to your discord for a makeover. Quanty is a multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard.',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/quanty_128.jpg`,
              width: 800,
              height: 420,
              alt: 'Quanty Bot Mascot',
              type: 'image/jpeg',
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: `${process.env.NEXT_PUBLIC_APP_URL}/quanty_128.jpg`,
          },
        ]}
      />
      <Navbar />
      {children}
      {footer && <Footer />}
    </>
  )
}

export default BaseLayout
