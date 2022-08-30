import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ReactElement } from 'react'

import DashboardContent from '../../../components/dashboard/dashboardContent'
import { useCurrentGuildConfig } from '../../../hooks'
import { DashboardLayout } from '../../../layouts'

const OverviewPluginsPage = dynamic(
  () => import('../../../components/dashboard/pages/overview'),
  {
    ssr: false,
  },
)

const OverviewPage = () => {
  const { guild } = useCurrentGuildConfig()

  return (
    <DashboardContent
      title="Overview"
      description="What would you like to change today?"
      actionButton={
        <Link href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE}>
          <a className="whitespace-nowrap rounded-3xl bg-primary-bright-purple px-6 py-2 text-center">
            Support Server
          </a>
        </Link>
      }
      separateTitle
    >
      <div className="flex w-full flex-col space-y-10">
        <div>
          <p className="italic">ID: {guild?.id}</p>

          <div className="mt-5">
            <p className="mb-2">
              Join the Quantum Realm to give recommendations, get updates, and
              more.
            </p>

            <Link href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE}>
              <a className="whitespace-nowrap rounded-3xl bg-primary-bright-purple px-4 py-2 text-sm">
                Support Server
              </a>
            </Link>
          </div>
        </div>

        <OverviewPluginsPage />
      </div>
    </DashboardContent>
  )
}

OverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default OverviewPage
