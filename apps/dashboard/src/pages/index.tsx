import { gql } from '@apollo/client'

import FeatureBox from '../components/Home/FeatureBox'
import Hero from '../components/Home/Hero'
import TempHome from '../components/TempHome'
import HomeLayout from '../layouts/Home'
import client from '../libs/apollo-client'

const Home = () => {
  if (process.env.NODE_ENV == 'production') {
    return <TempHome />
  }

  const test = async () => {
    const { data } = await client.query({
      query: gql`
        query User {
          user {
            discriminator
            discordId
            username
            email
            avatar
            locale
            verified
            flags
          }
        }
      `,
    })
  }

  test()

  // TODO: Use next-auth to try server side auth and site generation

  return (
    <HomeLayout>
      <Hero />
      <FeatureBox />
    </HomeLayout>
  )
}

export default Home
