import { LOGO, WEBAPP_URL } from '@quanty/lib'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAtomValue, useSetAtom } from 'jotai/react'
import { signIn, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '~/api'
import UserDropdownMenu from '~/components/UserDropdownMenu'
import { currentGuildAtom } from '~/lib/guildStore'

const GuildSelectionDropdown = dynamic(
  () => import('../components/GuildSelectionDropdown'),
  {
    loading: () => (
      <div className="flex items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-theme-primary" />
      </div>
    ),
  },
)

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const setCurrentGuild = useSetAtom(currentGuildAtom)

  const routerGuildId = router.query.guildId as string

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      void signIn('discord', {
        callbackUrl: `${WEBAPP_URL}${router.asPath}`,
        redirect: false,
      })
    },
  })

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      void signIn('discord') // Force sign in to hopefully resolve error
    }
  }, [session?.error])

  api.user.managedGuilds.useQuery(undefined, {
    enabled: status === 'authenticated',
    onSuccess: data => {
      if (routerGuildId) {
        const routerGuild = data.find(guild => guild.id === routerGuildId)
        setCurrentGuild(routerGuild)
      } else {
        setCurrentGuild(undefined)
        void router.push({
          pathname: '/dashboard',
        })
      }
    },
  })

  useEffect(() => {
    if (!routerGuildId) {
      setCurrentGuild(undefined)
    }
  }, [routerGuildId, setCurrentGuild])

  return (
    <div className="min-safe-h-screen flex flex-col overflow-hidden">
      <DashboardNavbar />
      <div
        className={`h-full w-full flex-auto overflow-y-scroll rounded-t-3xl bg-dark-purple-700 p-6 shadow-[0px_8px_16px_#C335F0]`}
      >
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

const DashboardNavbar = () => {
  const { data: session } = api.auth.getSession.useQuery()

  const currentGuild = useAtomValue(currentGuildAtom)

  return (
    <div className="flex h-20 shrink-0 items-center justify-between bg-theme-base px-4">
      <Link href="/">
        <Image
          src={LOGO.sm}
          alt="Quanty Profile Image"
          width={40}
          height={40}
          priority
          className="h-10 w-10 overflow-hidden rounded-full shadow-md shadow-theme-primary"
        />
      </Link>

      {currentGuild ? <GuildSelectionDropdown /> : null}

      {session?.user ? <UserDropdownMenu user={session.user} /> : null}
    </div>
  )
}
