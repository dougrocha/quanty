import { NextSeo } from 'next-seo'
import React from 'react'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

const BaseLayout = ({ children, title = 'Discord Bot' }: LayoutProps) => {
  useAuth()

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="Quanty | %s"
        defaultTitle="Quanty | Discord Bot"
        description="🤖 Add Quanty to your discord for a makeover. Quanty is a multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard."
        canonical={`${process.env.APP_URL}`}
        openGraph={{
          type: 'website',
          url: `${process.env.APP_URL}`,
          title: `Quanty | ${title}`,
          description:
            '🤖 Add Quanty to your discord for a makeover. Quanty is a multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard.',
          images: [
            {
              url: `${process.env.APP_URL}/quanty_128.jpg`,
              width: 800,
              height: 420,
              alt: 'Quanty Bot Mascot',
              type: 'image/jpeg',
            },
          ],
        }}
        additionalLinkTags={[
          { rel: 'icon', href: `${process.env.APP_URL}/quanty_128.jpg` },
        ]}
      />
      {/* <div className="bg-[url('/new.svg')] bg-contain bg-center bg-repeat-y  text-primary-white antialiased"> */}
      <div className=" text-primary-white antialiased">
        <Navbar />

        {children}
        <Footer />
      </div>
    </>
  )
}

export default BaseLayout
