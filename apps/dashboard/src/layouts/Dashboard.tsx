import { useAtom, useAtomValue } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ClapSpinner } from 'react-spinners-kit'

import { DashboardSidebar, DashboardNavbar } from '../components/Dashboard'
import {
  useGetUserQuery,
  useGetGuildConfigQuery,
} from '../graphql/generated/schema'
import { currentGuildAtom, guildConfigAtom } from '../utils/store'
import { currentUserAtom } from '../utils/store/currentUser'

interface LayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [user, setUser] = useAtom(currentUserAtom)
  const currGuild = useAtomValue(currentGuildAtom)
  const [guildConfig, setGuildConfig] = useAtom(guildConfigAtom)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady, currGuild])

  useGetUserQuery({
    onCompleted: ({ user }) => setUser(user),
    skip: user != null, // Sets the user if the user doesnt exist
    fetchPolicy: 'cache-and-network',
  })

  const { loading } = useGetGuildConfigQuery({
    onCompleted: ({ guildConfig }) => setGuildConfig(guildConfig),
    variables: { guildId: router.query.guildId as never },
    skip: guildConfig != null,
    fetchPolicy: 'cache-and-network',
  })

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

        <meta name="theme-color" content="#1C1A25" />
      </Head>
      <div className="flex h-screen overflow-auto bg-primary-darkPurpleBg text-primary-white antialiased">
        <DashboardSidebar />
        <div className="h-screen w-full bg-primary-purple-20">
          <DashboardNavbar />
          {loading ? (
            <ClapSpinner frontColor="#ffffff" backColor="#6635F0" size={70} />
          ) : (
            <>{children}</>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
