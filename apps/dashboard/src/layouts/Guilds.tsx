import { useAtomValue } from 'jotai'
import Head from 'next/head'
import { ClapSpinner } from 'react-spinners-kit'

import Navbar from '../components/Navbar'
import { currentUserAtom } from '../utils/store/currentUser'

interface LayoutProps {
  children: React.ReactNode
}

const GuildsLayout = ({ children }: LayoutProps) => {
  const user = useAtomValue(currentUserAtom)

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center overflow-auto bg-primary-purple-20 text-primary-white antialiased">
        <ClapSpinner frontColor="#ffffff" backColor="#6635F0" size={70} />
      </div>
    )

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

      <div className="relative block h-screen overflow-y-auto overflow-x-hidden bg-primary-darkPurpleBg antialiased">
        <div className="mx-auto max-w-6xl px-4 text-primary-white sm:px-6 xl:px-0">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  )
}

export default GuildsLayout
