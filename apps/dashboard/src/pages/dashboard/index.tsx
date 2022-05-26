import { ApolloError } from '@apollo/client'
import { useAtom } from 'jotai'
import { GetServerSidePropsContext } from 'next'

import { GuildCard } from '../../components/GuildCard'
import {
  GetMutualGuildsDocument,
  GetMutualGuildsQuery,
  GetUserDocument,
  GetUserQuery,
  useGetMutualGuildsQuery,
} from '../../graphql/generated/schema'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import GuildsLayout from '../../layouts/Guilds'
import { addApolloState, initializeApollo } from '../../libs/apolloClient'
import { mutualGuildsAtom } from '../../utils/store'

export const GuildPage = () => {
  useCurrentUser()
  const [mutualGuilds, setMutualGuilds] = useAtom(mutualGuildsAtom)

  useGetMutualGuildsQuery({
    onCompleted: ({ mutualGuilds }) => setMutualGuilds(mutualGuilds as never),
    skip: mutualGuilds?.length !== 0,
  })

  return (
    <GuildsLayout>
      <h1 className="mt-24 text-center text-4xl">Your Servers</h1>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center py-10 text-primary-white">
        {mutualGuilds?.map(guild => (
          <GuildCard key={`guild-${guild.id}`} guild={guild} />
        ))}
      </div>
    </GuildsLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const client = initializeApollo({ headers: context?.req?.headers })

  try {
    await client.query<GetMutualGuildsQuery>({
      query: GetMutualGuildsDocument,
    })

    await client.query<GetUserQuery>({
      query: GetUserDocument,
    })

    return addApolloState(client, {
      props: {},
    })
  } catch (e: unknown) {
    if (e instanceof ApolloError) {
      if (e.message === 'You must be logged in first.') {
        return {
          redirect: { destination: '/login' },
        }
      } else {
        return {
          notFound: true,
        }
      }
    }
  }
}

export default GuildPage
