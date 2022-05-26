import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import {
  GetMutualGuildsDocument,
  GetMutualGuildsQuery,
  Guild,
  useGetGuildConfigQuery,
} from '../../../graphql/generated/schema'
import DashboardLayout from '../../../layouts/Dashboard'
import { addApolloState, initializeApollo } from '../../../libs/apolloClient'
import { currentGuildAtom } from '../../../utils/store/currentGuild'
import { guildConfigAtom } from '../../../utils/store/guildConfig'

interface OverviewPageProps {
  currentGuild: Guild
}

const OverviewPage = ({ currentGuild }: OverviewPageProps) => {
  useHydrateAtoms([[currentGuildAtom, currentGuild]] as const)

  const router = useRouter()
  const { query } = router

  const [guildConfig, setGuildConfig] = useAtom(guildConfigAtom)

  useGetGuildConfigQuery({
    variables: { guildId: (query.guildId as string) ?? '' },
    onCompleted: ({ guildConfig }) => {
      setGuildConfig(guildConfig)
    },
  })

  return (
    <div className="bg-red-500">
      Prefix: {guildConfig?.guildId || 'Not Available'}
      {'\n'}
      {JSON.stringify(guildConfig)}
    </div>
  )
}

OverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context

  if (!params)
    return {
      redirect: { destination: '/dashboard' },
    }

  const client = initializeApollo({ headers: context?.req?.headers })

  const {
    data: { mutualGuilds },
  } = await client.query<GetMutualGuildsQuery>({
    query: GetMutualGuildsDocument,
  })

  const currentGuild = mutualGuilds.find(guild => guild.id === params.guildId)

  return addApolloState(client, {
    props: { currentGuild },
  })
}

export default OverviewPage
