// Imports
import type { NextPage } from 'next';
import Head from 'next/head';

// Layouts & CSS
import Layout from '../layouts/Layout';

import HeroComponent from '../components/Hero';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quanty - Discord Bot</title>
        <meta
          name="description"
          content="Quanty gives you freedom. While you focus on your chat, Quanty will do the heavy lifting behind scenes."
        />
      </Head>

      <Layout>
        <HeroComponent />
      </Layout>
    </>
  );
};

export default Home;
