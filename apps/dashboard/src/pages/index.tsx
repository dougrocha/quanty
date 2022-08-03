import { ReactElement } from 'react'

import Hero from '../components/Home/Hero'
import BaseLayout from '../layouts/BaseLayout'

const Home = () => {
  // TODO Update text and format for production
  return (
    <>
      <Hero />
      {/* <FeatureBox />
      <HelpBox /> */}
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout footer>{page}</BaseLayout>
}

export default Home
