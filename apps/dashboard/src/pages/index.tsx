import FeatureBox from '../components/Home/FeatureBox'
import HelpBox from '../components/Home/HelpBox'
import Hero from '../components/Home/Hero'
import BaseLayout from '../layouts/BaseLayout'

const Home = () => {
  return (
    <BaseLayout>
      <Hero />
      <FeatureBox />
      <HelpBox />
    </BaseLayout>
  )
}

export default Home
