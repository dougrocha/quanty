import { ApolloError } from '@apollo/client'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'
import { ReactElement } from 'react'

import {
  GetMutualGuildsQuery,
  GetMutualGuildsDocument,
  Guild,
} from '../../../graphql/generated/schema'
import DashboardLayout from '../../../layouts/Dashboard'
import { addApolloState, initializeApollo } from '../../../libs/apolloClient'
import { currentGuildAtom } from '../../../utils/store'

interface ISettingsPageProps {
  currentGuild: Guild
}

const SettingsPage = ({ currentGuild }: ISettingsPageProps) => {
  useHydrateAtoms([[currentGuildAtom, currentGuild]] as const)

  return <div className="bg-red-500">SETTINGS</div>
}

SettingsPage.getLayout = (page: ReactElement) => {
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

export default SettingsPage
