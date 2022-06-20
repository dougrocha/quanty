import { ApolloError } from '@apollo/client'
import { useAtom } from 'jotai'
import { GetServerSidePropsContext } from 'next'

import { GuildCard } from '../../components/GuildCard'
import {
  GetMutualGuildsDocument,
  GetMutualGuildsQuery,
  useGetMutualGuildsQuery,
} from '../../graphql/generated/schema'
import GuildsLayout from '../../layouts/Guilds'
import { addApolloState, initializeApollo } from '../../libs/apolloClient'
import { mutualGuildsAtom } from '../../utils/store'

export const GuildPage = () => {
  const [mutualGuilds, setMutualGuilds] = useAtom(mutualGuildsAtom)

  useGetMutualGuildsQuery({
    onCompleted: ({ mutualGuilds }) => setMutualGuilds(mutualGuilds),
  })

  return (
    <GuildsLayout>
      <h1 className="mt-16 text-center text-4xl">Your Servers</h1>
      {/* <div className="mx-auto mt-10 grid max-w-6xl justify-center py-10 text-primary-white md:flex md:grid-cols-none md:flex-wrap"> */}
      <div className="mx-auto mb-auto mt-6 grid w-full space-y-6 px-6 sm:justify-center lg:flex lg:w-fit lg:flex-wrap lg:items-center lg:space-y-0">
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
