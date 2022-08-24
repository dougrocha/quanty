import Link from 'next/link'

const Hero = () => {
  // TODO: Find way to implement background
  return (
    <div className="relative my-80 flex flex-col items-center justify-center px-4">
      <h1 className="text-center text-4xl font-bold">Quantum Realm Platform</h1>
      <h2 className="text-md mt-1 text-center text-secondary-white">
        Serving quality of life discord features with Quanty.
      </h2>
      <div className="mt-11 flex flex-col space-y-5">
        <Link href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE}>
          <a className="rounded-3xl bg-primary-bright-purple px-12 py-2 text-center">
            Invite Quanty
          </a>
        </Link>
        <Link href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE}>
          <a className="rounded-3xl bg-primary-purple-10 px-12 py-2 text-center">
            Support Server
          </a>
        </Link>
        <Link href={'/dashboard'}>
          <a className="rounded-3xl bg-primary-purple-10 px-12 py-2 text-center">
            Dashboard (Alpha)
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Hero
