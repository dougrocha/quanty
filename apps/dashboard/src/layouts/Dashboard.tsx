import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import type { ClapSpinner as ClapSpinnerType } from 'react-spinners-kit'
import { useMedia } from 'react-use'

import { DashboardNavbar } from '../components/dashboard'
import { useGuildConfigSubscription } from '../graphql/generated/schema'
import { useAuth, useClickOn } from '../hooks'
import { useCurrentGuildConfig } from '../hooks/useCurrentGuildConfig'
import { useCurrentGuildId } from '../hooks/useCurrentGuildId'
import { useSubscribeGuildConfig } from '../hooks/useSubscribeGuildConfig'
import { sidebarOpenAtom } from '../utils/atoms/dashboardSidebarStatus'

const ClapSpinner: typeof ClapSpinnerType = dynamic(() =>
  import('react-spinners-kit').then(mod => mod['ClapSpinner']),
)

const DashboardSidebar = dynamic(
  () => import('../components/dashboard/sidebar'),
)

interface LayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  useAuth()

  const guildId = useCurrentGuildId()
  const { loading } = useCurrentGuildConfig()

  const [sidebarOpened, setSidebarOpen] = useAtom(sidebarOpenAtom)

  const dashboardContainerRef = useRef(null)

  const isLarge = useMedia('(min-width: 1024px)', false)

  useClickOn(dashboardContainerRef, () => {
    if (isLarge) return
    setSidebarOpen(false)
  })

  useSubscribeGuildConfig(guildId)

  return (
    <>
      <Head>
        <title>{'Quanty | Discord Bot'}</title>
        <link rel="icon" href="/quanty-128.jpg" />
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
      <div
        className={`relative flex h-screen w-screen items-center justify-center overflow-hidden antialiased`}
      >
        <div className="flex h-full w-full max-w-[2560px] transition-all">
          <DashboardSidebar />
          <div
            ref={dashboardContainerRef}
            className={`h-full w-full bg-primary-purple-20`}
          >
            <Toaster />
            <DashboardNavbar />
            {loading ? (
              <div className="flex h-[calc(100%_-_64px)] items-center justify-center">
                <ClapSpinner frontColor={'#ffffff'} backColor={'#ffffff'} />
              </div>
            ) : (
              <div className="h-[calc(100%_-_64px)] overflow-auto">
                <motion.div
                  animate={{
                    filter: sidebarOpened ? 'blur(3px)' : 'blur(0px)',
                  }}
                  className={`min-h-full w-full p-10 lg:!blur-0 ${
                    sidebarOpened
                      ? 'pointer-events-none select-none blur-sm lg:pointer-events-auto lg:select-auto'
                      : ''
                  }`}
                >
                  {children}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
