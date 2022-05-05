import { ApolloError } from '@apollo/client'
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'

import { currentUserAtom } from '..'
import { GuildCard } from '../../components/GuildCard'
import {
  GetOwnerGuildsDocument,
  GetOwnerGuildsQuery,
  GetUserDocument,
  GetUserQuery,
  Guild,
} from '../../graphql/generated/schema'
import GuildsLayout from '../../layouts/Guilds'
import { useSsrQuery } from '../../libs/useSsrQuery'
import { validateCookies } from '../../libs/validateCookies'
import { CurrentUser } from '../../utils/types'

interface GuildPageProps {
  guilds: Guild[]
  user: CurrentUser
}

export const GuildPage = ({ guilds, user: currentUser }: GuildPageProps) => {
  useHydrateAtoms([[currentUserAtom, currentUser]] as const)

  return (
    <GuildsLayout>
      <h1 className="mt-24 text-center text-4xl">Your Servers</h1>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center py-10 text-primary-white">
        {guilds.map(({ id, icon, name }) => {
          return (
            <GuildCard key={`guild-${id}`} id={id} name={name} icon={icon} />
          )
        })}
      </div>
    </GuildsLayout>
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
