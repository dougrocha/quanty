import { ApolloError } from '@apollo/client'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import { currentUserAtom } from '..'
import {
  GetGuildConfigDocument,
  GetGuildConfigQuery,
  GetUserDocument,
  GetUserQuery,
  GuildConfig,
} from '../../graphql/generated/schema'
import DashboardLayout, { currentGuildAtom } from '../../layouts/Dashboard'
import { useSsrQuery } from '../../libs/useSsrQuery'
import { validateCookies } from '../../libs/validateCookies'
import { CurrentUser } from '../../utils/types'

interface GuildPageProps {
  guild: GuildConfig
  user: CurrentUser
}

const GuildPage = ({
  guild: currentGuild,
  user: currentUser,
}: GuildPageProps) => {
  useHydrateAtoms([[currentUserAtom, currentUser]] as const)
  useHydrateAtoms([[currentGuildAtom, currentGuild]] as const)

  console.log(currentGuild)
  console.log(currentUser)

  const router = useRouter()

  return <DashboardLayout>Guild {router.query.id}</DashboardLayout>
}

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const headers = validateCookies(context)

//   const { params } = context

//   if (!params)
//     return {
//       redirect: { destination: '/' },
//     }

//   if (!headers)
//     return {
//       redirect: { destination: '/login' },
//     }

//   try {
//     const { data } = await useSsrQuery<GetGuildConfigQuery>(
//       GetGuildConfigDocument,
//       headers,
//       {
//         variables: { guildId: params.guildId },
//       },
//     )

//     const { data: userData } = await useSsrQuery<GetUserQuery>(
//       GetUserDocument,
//       headers,
//     )

//     console.log(data.guildConfig)

//     return {
//       props: {
//         guilds: data.guildConfig,
//         user: userData.user,
//       },
//     }
//   } catch (e: unknown) {
//     if (e instanceof ApolloError) {
//       if (e.message === 'You must be logged in first.') {
//         return {
//           redirect: { destination: '/login' },
//         }
//       }
//     }
//   }
// }

export default GuildPage
