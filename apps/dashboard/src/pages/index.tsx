import FeatureBox from '../components/Home/FeatureBox'
import Hero from '../components/Home/Hero'
import TempHome from '../components/TempHome'
import HomeLayout from '../layouts/Home'

const Home = () => {
  if (process.env.NODE_ENV == 'production') {
    return <TempHome />
  }

  // TODO: Use next-auth to try server side auth and site generation

  return (
    <HomeLayout>
      <Hero />
      <FeatureBox />
    </HomeLayout>
  )
}

export default Home
