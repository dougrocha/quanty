import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { ReactElement } from 'react'

import DashboardContent from '../../../components/dashboard/dashboardContent'
import DashboardLayout from '../../../layouts/Dashboard'
import { guildConfigAtom } from '../../../utils/atoms'

const OverviewPage = () => {
  const guild = useAtomValue(guildConfigAtom)

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
      seperateTitle
    >
      <div className="grid w-full grid-cols-1 gap-y-20 gap-x-10 sm:grid-cols-2 md:grid-cols-3 md:gap-y-40 md:gap-x-20">
        <div className="text-lg">
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
      </div>
    </DashboardContent>
  )
}

OverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default OverviewPage
