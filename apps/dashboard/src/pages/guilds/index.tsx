import { ApolloError } from '@apollo/client'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'

import { currentUserAtom } from '..'
import Navbar from '../../components/Navbar'
import {
  GetOwnerGuildsDocument,
  GetOwnerGuildsQuery,
  GetUserDocument,
  GetUserQuery,
} from '../../graphql/generated/schema'
import { useSsrQuery } from '../../libs/useSsrQuery'
import { validateCookies } from '../../libs/validateCookies'
import { CurrentUser } from '../../utils/types'

interface Guild {
  id: string
}
interface GuildPageProps {
  guilds: Guild[]
  user: CurrentUser
}

export const GuildPage = ({ guilds, user: currentUser }: GuildPageProps) => {
  useHydrateAtoms([[currentUserAtom, currentUser]] as const)

  return (
    <div className="mx-auto max-w-6xl px-4 text-primary-white sm:px-6 xl:px-0">
      <Navbar />
      Guild Page
      <div className="text-xl text-green-600">
        {guilds.map(({ id }) => {
          return <p key={id}>{id}</p>
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const headers = validateCookies(context)

  if (!headers)
    return {
      redirect: { destination: '/login' },
    }

  try {
    const { data } = await useSsrQuery<GetOwnerGuildsQuery>(
      GetOwnerGuildsDocument,
      headers,
    )

    const { data: userData } = await useSsrQuery<GetUserQuery>(
      GetUserDocument,
      headers,
    )

    return {
      props: {
        guilds: data.ownerGuilds,
        user: userData.user,
      },
    }
  } catch (e: unknown) {
    if (e instanceof ApolloError) {
      if (e.message === 'You must be logged in first.') {
        return {
          redirect: { destination: '/login' },
        }
      }
    }
  }
}

export default GuildPage
