import Head from 'next/head'

interface LayoutProps {
  children: React.ReactNode
}

const HomeLayout = ({ children }: LayoutProps) => {
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

        <meta name="theme-color" content="#121e44"></meta>
      </Head>

      <div className=" block min-h-screen overflow-auto bg-gradient-to-r from-[#321569]/95 to-[#121e44] antialiased">
        <main>{children}</main>
      </div>
    </>
  )
}

export default HomeLayout
