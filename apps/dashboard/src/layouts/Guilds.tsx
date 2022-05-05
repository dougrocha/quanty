import Head from 'next/head'

import Navbar from '../components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const GuildsLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{'Quanty | Discord Bot'}</title>
        <link rel="icon" href="/quanty-64.png" />
        <meta
          name="description"
          content="🤖 Multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard."
        />
        <meta property="og:title" content={'Quanty | Discord Bot'} />
        <meta
          property="og:description"
          content="🤖 Multi-purpose bot to replace them all. Moderation | Economy | Memes | Games | Dashboard."
        />
        <meta property="og:url" content="https://quanty.xyz/" />
        <meta property="og:type" content="website" />

        <meta name="theme-color" content="#1C1A25"></meta>
      </Head>

      <div className="block h-screen overflow-auto bg-primary-darkPurpleBg antialiased">
        <div className="mx-auto max-w-6xl px-4 text-primary-white sm:px-6 xl:px-0">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  )
}

export default GuildsLayout
