import Head from 'next/head'
import { useState } from 'react'

import DashboardSidebar from '../components/Dashboard/Sidebar'
import { GuildConfig } from '../graphql/generated/schema'
import { CurrentGuildContextProvider } from '../utils/providers/currentGuildProvider'

interface LayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [guild, setGuild] = useState<GuildConfig | null>(null)

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

        <meta name="theme-color" content="#1C1A25" />
      </Head>

      <div className="block h-screen overflow-auto bg-primary-darkPurpleBg text-primary-white antialiased">
        <CurrentGuildContextProvider value={{ guild, setGuild }}>
          <DashboardSidebar guild={guild} />
          {children}
        </CurrentGuildContextProvider>
      </div>
    </>
  )
}

export default DashboardLayout
