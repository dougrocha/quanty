import Link from 'next/link'
import { GITHUB } from '@quanty/lib'

import { env } from '~/env/client.mjs'
import DashboardLayout from '~/layouts/DashboardLayout'
import { NextPageWithLayout } from '~/lib/types'

const DashboardPage: NextPageWithLayout = () => {
  // const currentGuild = useAtomValue(currentGuildAtom)

  // const { data: guild } = api.guild.getGuild.useQuery(
  //   currentGuild?.id as string,
  //   {
  //     enabled: !!currentGuild,
  //   },
  // )

  return (
    <>
      <div className="prose-invert prose mx-auto w-80 p-4">
        <p className="break-words">
          Thank you for checking out my Discord Bot <b>Quanty</b>. The dashboard
          is a work in progress, but check back frequently for new features.
          Your support means everything to me!
        </p>

        <p>
          If you would like to see any features be introduce please check out
          the{' '}
          <Link href={env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL}>Discord</Link>{' '}
          or <Link href={GITHUB}>Github</Link>
        </p>
      </div>
    </>
  )
}

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default DashboardPage
