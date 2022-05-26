import Link from 'next/link'
import React from 'react'

import { StaticLinks } from '../../utils/constants/API'

const Hero = () => {
  // TODO: Find way to implement background
  return (
    <div className="relative mb-36 mt-28 flex h-96 flex-col items-center justify-center xl:mb-64 xl:mt-48">
      <h1 className="text-center text-4xl font-bold">Quantum Realm Platform</h1>
      <h2 className="text-md mt-1 text-center text-secondary-white">
        Serving quality of life discord features with Quanty.
      </h2>
      <div className="mt-11 flex flex-col space-y-5">
        <Link href={StaticLinks.QUANTY_BOT_INVITE}>
          <a className="rounded-3xl bg-primary-bright-purple px-12 py-2 text-center">
            Invite Quanty
          </a>
        </Link>
        <Link href={StaticLinks.QUANTY_SERVER_INVITE}>
          <a className="rounded-3xl bg-primary-purple-10 px-12 py-2 text-center">
            Support Server
          </a>
        </Link>
        <Link href={'/dashboard'}>
          <a className="rounded-3xl bg-primary-purple-10 px-12 py-2 text-center">
            Dashboard (WIP)
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Hero
