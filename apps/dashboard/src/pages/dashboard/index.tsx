import { useAtom } from 'jotai'
import { ReactElement } from 'react'

import {
  GuildCard,
  GuildCardSkeleton,
} from '../../components/Dashboard/GuildCard'
import { useGetMutualGuildsQuery } from '../../graphql/generated/schema'
import { BaseLayout } from '../../layouts'
import { mutualGuildsAtom } from '../../utils/atoms'

export const GuildPage = () => {
  const [mutualGuilds, setMutualGuilds] = useAtom(mutualGuildsAtom)

  const { loading } = useGetMutualGuildsQuery({
    onCompleted: ({ mutualGuilds }) => setMutualGuilds(mutualGuilds),
  })

  return (
    <>
      <h1 className="mt-16 text-center text-4xl">Your Servers</h1>
      {/* <div className="mx-auto mt-10 grid max-w-6xl justify-center py-10 text-primary-white md:flex md:grid-cols-none md:flex-wrap"> */}
      <div className="mx-auto mb-auto mt-6 grid w-full space-y-6 px-6 sm:justify-center lg:flex lg:w-fit lg:flex-wrap lg:items-center lg:space-y-0">
        {mutualGuilds?.map(guild => (
          <GuildCard key={`guild-${guild.id}`} guild={guild} />
        ))}
        {loading && [1, 2, 3].map(i => <GuildCardSkeleton key={i} />)}
      </div>
    </>
  )
}

GuildPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}

export default GuildPage
