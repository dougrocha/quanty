import { NextSeo } from 'next-seo'

import Navbar from '../components/Navbar'

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

const GuildsLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <NextSeo
        title={'Your Guilds'}
        titleTemplate="Quanty | %s"
        defaultTitle="Quanty | Discord Bot"
        description="🤖 Add Quanty to your discord for a makeover. Quanty is a multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard."
        canonical={`${process.env.APP_URL}`}
        openGraph={{
          type: 'website',
          url: `${process.env.APP_URL}`,
          title: `Quanty | Your Guilds`,
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
      <div className=" text-primary-white antialiased">
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default GuildsLayout
