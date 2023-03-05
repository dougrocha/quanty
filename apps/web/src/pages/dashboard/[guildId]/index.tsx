import Link from 'next/link'
import { useAtomValue } from 'jotai'
import { GITHUB } from '@quanty/lib'

import DashboardLayout from '~/layouts/DashboardLayout'
import { NextPageWithLayout } from '~/lib/types'
import { api } from '../../../api'
import { currentGuildAtom } from '../../../lib/guildStore'

const DashboardPage: NextPageWithLayout = () => {
  const currentGuild = useAtomValue(currentGuildAtom)

  const {
    data: guild,
    isSuccess,
    isLoading,
    error,
  } = api.guild.getById.useQuery(currentGuild?.id as string, {
    enabled: !!currentGuild,
    retry: (_failureCount, error) => {
      return error.shape?.data.httpStatus !== 403
    },
  })

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-theme-primary" />
      </div>
    )

  return (
    <>
      <div className="prose-invert prose mx-auto p-4">
        {isSuccess && guild ? (
          <>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="break-words">
              Welcome to the dashboard for{' '}
              <b className="text-theme-secondary">{guild?.name}</b>!
            </p>
          </>
        ) : null}

        <p className="break-words">
          Thank you for checking out my Discord Bot <b>Quanty</b>. The dashboard
          is a work in progress, but check back frequently for new features.
          Your support means everything to me!
        </p>

        <p>
          If you would like to see any features be introduce please check out
          the <Link href="/discord">Discord</Link> or{' '}
          <Link href={GITHUB}>Github</Link>
        </p>

        {error ? (
          <p className="text-red-500">
            {error.shape?.data.httpStatus === 403 ? (
              <>
                You do not have permission to view this guild. However, I am
                constantly working on new features to provide admins more power
                over Quanty. Thank you for your understanding!
              </>
            ) : (
              <>There was an error loading the guild. Please try again later.</>
            )}
          </p>
        ) : null}
      </div>
    </>
  )
}

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
