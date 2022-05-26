import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'

import FeatureBox from '../components/Home/FeatureBox'
import Hero from '../components/Home/Hero'
import { GetUserDocument } from '../graphql/generated/schema'
import HomeLayout from '../layouts/Home'
import { addApolloState, initializeApollo } from '../libs/apolloClient'
import { currentUserAtom } from '../utils/store/currentUser'
import { CurrentUser } from '../utils/types'

interface HomeProps {
  user: CurrentUser | null
}

const Home = ({ user: currentUser }: HomeProps) => {
  if (currentUser != null) useHydrateAtoms([[currentUserAtom, currentUser]])

  // if (process.env.NODE_ENV == 'production') {
  //   return <TempHome />
  // }

  return (
    <HomeLayout>
      <Hero />
      <div className="relative mb-36 mt-28 block h-96 flex-col items-center justify-center xl:mb-64 xl:mt-48">
        <Image
          src={'/dashboard_preview.jpg'}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <FeatureBox />
    </HomeLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const client = initializeApollo({ headers: context?.req?.headers })

  try {
    const {
      data: { user },
    } = await client.query({
      query: GetUserDocument,
    })

    return addApolloState(client, {
      props: { user },
    })
  } catch (e) {
    return {
      props: {},
    }
  }
}

export default Home
