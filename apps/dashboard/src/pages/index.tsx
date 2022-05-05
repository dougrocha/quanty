import { useHydrateAtoms, atomWithReset } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'

import FeatureBox from '../components/Home/FeatureBox'
import Hero from '../components/Home/Hero'
import { GetUserDocument } from '../graphql/generated/schema'
import HomeLayout from '../layouts/Home'
import client from '../libs/apollo-client'
import { validateCookies } from '../libs/validateCookies'
import { CurrentUser } from '../utils/types'

interface HomeProps {
  user: CurrentUser | null
}

export const currentUserAtom = atomWithReset<CurrentUser | null>(null)

const Home = ({ user: currentUser }: HomeProps) => {
  if (currentUser != null)
    useHydrateAtoms([[currentUserAtom, currentUser]] as const)

  // if (process.env.NODE_ENV == 'production') {
  //   return <TempHome />
  // }

  return (
    <HomeLayout>
      <Hero />
      <FeatureBox />
    </HomeLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const headers = validateCookies(context)

  if (!headers)
    return {
      props: {
        user: null,
      },
    }

  try {
    const { data } = await client.query({
      fetchPolicy: 'cache-first',
      query: GetUserDocument,
      context: {
        headers: {
          cookie: headers.Cookie,
        },
      },
    })

    return {
      props: {
        user: data ? data.user : null,
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        user: null,
      },
    }
  }
}

export default Home
