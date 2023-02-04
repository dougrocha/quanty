import DashboardLayout from '~/layouts/DashboardLayout'
import { NextPageWithLayout } from '~/lib/types'
import { api } from '../../../api'
import { useAtomValue } from 'jotai'
import { currentGuildAtom } from '../../../lib/guildStore'

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
      <div className="break-words">Dashboard Page</div>
    </>
  )
}

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
