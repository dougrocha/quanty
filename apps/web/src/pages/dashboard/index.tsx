import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSetAtom } from 'jotai'
import Skeleton from 'react-loading-skeleton'

import { api } from '~/api'
import DashboardLayout from '~/layouts/DashboardLayout'
import getGuildIcon from '~/lib/getGuildIcon'
import { currentGuildAtom } from '~/lib/guildStore'
import { NextPageWithLayout } from '~/lib/types'

const DashboardPage: NextPageWithLayout = () => {
  const {
    data: guilds,
    isLoading,
    isError,
  } = api.user.getManagedGuilds.useQuery()

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
        <p className="mx-auto text-lg font-semibold text-red-500">
          There was an error fetching your guilds. Please try again later.
        </p>
      ) : null}

      {!guilds || guilds?.length === 0 ? (
        <p>You seem lonely. You should find some friends.</p>
      ) : (
        <>
          {guilds
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
                  className="mx-auto my-4 flex w-full max-w-screen-lg items-center justify-between space-x-4 overflow-auto rounded-lg bg-theme-base pr-10"
                >
                  <div className="flex items-center">
                    {iconUrl ? (
                      <Image
                        src={iconUrl}
                        alt="Quanty Profile Image"
                        width={64}
                        height={64}
                        priority
                        className="h-16 w-16"
                      />
                    ) : null}

                    <span className="ml-6 text-lg font-medium">
                      {guild.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 font-medium">
                    <span
                      className={`w-20 rounded-lg py-1 px-2 text-center ${
                        guild.owner ? 'bg-theme-primary' : 'bg-theme-secondary'
                      }`}
                    >
                      {guild.owner ? 'Owner' : 'Admin'}
                    </span>

                    <button
                      className="w-24 rounded-lg bg-theme-neutral py-1 px-2"
                      onClick={() => {
                        router.push(`/dashboard/${guild.id}`)
                        setCurrentGuild(guild)
                      }}
                    >
                      {guild.bot ? 'Manage' : 'Invite'}
                    </button>
                  </div>
                </div>
              )
            })}
        </>
      )}
    </>
  )
}

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
