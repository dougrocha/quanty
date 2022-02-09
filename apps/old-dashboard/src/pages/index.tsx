// Imports
import type { NextPage } from 'next'
import Head from 'next/head'

// Layouts & CSS
import HeroComponent from '../components/Hero'
import Layout from '../layouts/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quanty - Discord Bot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Quanty gives you freedom. While you focus on your chat, Quanty will do the heavy lifting behind scenes."
        />
      </Head>

      <Layout>
        <HeroComponent />
      </Layout>
    </>
  )
}

export default Home
