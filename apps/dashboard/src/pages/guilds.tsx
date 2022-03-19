import { gql } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'

import client from '../libs/apollo-client'
import { validateCookies } from '../libs/validateCookies'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GuildPage = ({ data }: { data: any }) => {
  return (
    <div className="text-white">
      Guild Page
      <div className="text-xl text-green-600">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.ownerGuilds.map((g: any) => {
          return <p key={g.id}>{g.id}</p>
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

  const { data } = await client.query({
    query: gql`
      query OwnerGuilds {
        ownerGuilds {
          id
        }
      }
    `,
    context: {
      headers: {
        cookie: headers.Cookie,
      },
    },
  })

  return {
    props: {
      data,
    },
  }
}

export default GuildPage
