import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSetAtom } from 'jotai'
import Skeleton from 'react-loading-skeleton'

import { api } from '~/api'
import DashboardLayout from '~/layouts/DashboardLayout'
import getGuildIcon from '~/lib/getGuildIcon'
import { currentGuildAtom } from '~/lib/guildStore'
import { NextPageWithLayout } from '~/lib/types'
import { clientEnv } from '../../env/schema.mjs'

const DashboardPage: NextPageWithLayout = () => {
  const {
    data: guilds,
    isLoading,
    isError,
    isSuccess,
  } = api.user.managedGuilds.useQuery()

  const setCurrentGuild = useSetAtom(currentGuildAtom)

  const router = useRouter()

  return (
    <>
      <div className="my-8 space-y-2 text-center">
        <h1 className="mx-auto text-4xl font-semibold uppercase">
          Your servers
        </h1>
        <p>
          Here you&apos;ll be able to choose the server you would want to
          configure.
        </p>
      </div>

      {isLoading ? (
        <div className="mx-auto h-16 w-full max-w-screen-lg">
          <Skeleton
            count={4}
            baseColor="#2B303A"
            highlightColor="#443F5A"
            className="my-4 h-full w-full"
          />
        </div>
      ) : null}

      {isError ? (
        <div className="mx-auto flex h-16 w-full max-w-screen-lg justify-center py-6 text-lg font-semibold text-red-500">
          <p>
            There was an error fetching your guilds. <br /> Please try again
            later.
          </p>
        </div>
      ) : null}

      {guilds?.length === 0 && isSuccess ? (
        <p>You seem lonely. You should find some friends.</p>
      ) : null}

      {guilds && guilds?.length > 0 && isSuccess ? (
        <>
          {guilds!
            // Alphabetical Sort
            .sort((a, b) => {
              if (a.name < b.name) return -1
              if (a.name > b.name) return 1
              return 0
            })
            // Sort Managed Guilds to the top
            .sort((a, b) => {
              if (a.bot && !b.bot) return -1
              if (!a.bot && b.bot) return 1
              return 0
            })
            .map(guild => {
              const iconUrl = getGuildIcon(guild)

              return (
                <div
                  key={guild.id}
                  className="mx-auto my-4 flex w-full max-w-screen-lg flex-col items-center justify-between gap-4 overflow-auto rounded-lg bg-theme-base py-2 pb-2 md:flex-row md:py-0 md:px-0 md:pr-10 md:pb-0"
                >
                  <div className="flex flex-col items-center gap-2 overflow-hidden md:flex-row">
                    {iconUrl ? (
                      <Image
                        src={iconUrl}
                        alt="Quanty Profile Image"
                        width={64}
                        height={64}
                        priority
                        className="h-16 w-16 rounded-full md:rounded-none"
                      />
                    ) : null}

                    <span className="px-4 text-lg font-medium line-clamp-2 md:truncate">
                      {guild.name}
                    </span>
                  </div>

                  <div className="flex w-full flex-col items-center justify-center gap-2 px-4 font-medium md:w-auto md:flex-row">
                    <span
                      className={`w-full rounded-lg py-1 px-2 text-center md:w-20 ${
                        guild.owner ? 'bg-theme-primary' : 'bg-theme-secondary'
                      }`}
                    >
                      {guild.owner ? 'Owner' : 'Admin'}
                    </span>

                    {guild.bot ? (
                      <button
                        className="w-full rounded-lg bg-theme-neutral py-1 px-2 md:w-24"
                        onClick={() => {
                          router.push(`/dashboard/${guild.id}`)
                          setCurrentGuild(guild)
                        }}
                      >
                        Manage
                      </button>
                    ) : (
                      <Link
                        className="w-full rounded-lg bg-theme-neutral py-1 px-2 text-center md:w-24"
                        href={inviteUrlWithGuild(guild.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Invite
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
        </>
      ) : null}
    </>
  )
}

const inviteUrlWithGuild = (guildId: string) => {
  // This uses a & because INVITE_URL already has a ?
  return `${clientEnv.NEXT_PUBLIC_DISCORD_INVITE_URL}&guild_id=${guildId}`
}

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
