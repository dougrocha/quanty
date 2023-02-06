import { useAtomValue } from 'jotai'

import { api } from '~/api'
import DashboardLayout from '~/layouts/DashboardLayout'
import { currentGuildAtom } from '~/lib/guildStore'
import { NextPageWithLayout } from '~/lib/types'

const DashboardPage: NextPageWithLayout = () => {
  const currentGuild = useAtomValue(currentGuildAtom)

  const { data: guild } = api.guild.getGuild.useQuery(
    currentGuild?.id as string,
    {
      enabled: !!currentGuild,
    },
  )

  return (
    <>
      <div className="break-words">Dashboard Page: {guild?.id}</div>
    </>
  )
}

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
