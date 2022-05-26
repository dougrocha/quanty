import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'
import { ReactElement } from 'react'

import {
  GetMutualGuildsDocument,
  GetMutualGuildsQuery,
  Guild,
} from '../../../graphql/generated/schema'
import DashboardLayout from '../../../layouts/Dashboard'
import { addApolloState, initializeApollo } from '../../../libs/apolloClient'
import { currentGuildAtom } from '../../../utils/store'

interface ModerationPageProps {
  currentGuild: Guild
}

const ModerationPage = ({ currentGuild }: ModerationPageProps) => {
  useHydrateAtoms([[currentGuildAtom, currentGuild]] as const)

  return <div className="bg-red-500">MODERATION</div>
}

ModerationPage.getLayout = (page: ReactElement) => {
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

export default ModerationPage
