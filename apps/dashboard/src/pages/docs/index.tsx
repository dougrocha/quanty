import type { NextPage } from 'next'
import Link from 'next/link'

import ThemeToggleButton from '../../components/typography/themeToggle'

const Home: NextPage = () => {
  return (
    <div className="prose prose-lg flex h-screen w-full max-w-none flex-col items-center justify-center transition-all dark:prose-invert">
      <div className="absolute top-5 right-5">
        <ThemeToggleButton />
      </div>
      <h1>Quanty Docs</h1>
      <p className="text-center">
        <b>Currently under development.</b>
        <br />
        Join the Quantum Realm for future updates.
      </p>
      <div className="mt-11 flex flex-col space-y-5">
        <Link
          href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE}
          className="rounded-3xl bg-primary-lime-green px-12 py-2 text-center no-underline dark:bg-primary-bright-purple">
          
            Invite Quanty
          
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE}
          className="rounded-3xl bg-primary-lime-green px-12 py-2 text-center no-underline dark:bg-primary-purple-10">
          
            Support Server
          
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_QUANTY_APP_URL}/dashboard`}
          className="rounded-3xl bg-primary-lime-green px-12 py-2 text-center no-underline dark:bg-primary-purple-10">
          
            Dashboard (Alpha)
          
        </Link>
      </div>
    </div>
  );
}

export default Home
