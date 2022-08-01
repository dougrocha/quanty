import Link from 'next/link'
import { ReactElement } from 'react'

import DashboardContent from '../../../components/Dashboard/DashboardContent'
import { PrefixForm } from '../../../components/forms'
import { useGuildConfigSubscription } from '../../../graphql/generated/schema'
import { useCurrentGuildId } from '../../../hooks/useCurrentGuildId'
import DashboardLayout from '../../../layouts/Dashboard'
import { StaticLinks } from '../../../utils/constants/API'

const OverviewPage = () => {
  const guildId = useCurrentGuildId()

  useGuildConfigSubscription({
    variables: {
      guildId: guildId,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      console.debug(`[GUILD_CONFIG_UPDATE] - ${guildId}:`, {
        data: subscriptionData.data,
      })
    },
  })

  return (
    <DashboardContent
      title="Overview"
      description="What would you like to change today?"
      actionButton={
        <Link href={StaticLinks.QUANTY_SERVER_INVITE}>
          <a className="rounded-3xl bg-primary-bright-purple px-6 py-2 text-center">
            Support Server
          </a>
        </Link>
      }
      seperateTitle
    >
      <div className="grid min-h-full w-full grid-cols-3 gap-y-40 gap-x-20">
        <PrefixForm placeholder={'Change your prefix '} />
      </div>
    </DashboardContent>
  )
}

OverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default OverviewPage
