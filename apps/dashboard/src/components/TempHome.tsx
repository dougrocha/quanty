import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { StaticLinks } from '../utils/constants/API'

const TempHome = () => {
  return (
    <div className=" block min-h-screen overflow-auto bg-gradient-to-r from-[#321569]/95 to-[#121e44] antialiased">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full">
          <Image
            src={`/quanty-cropped-large.jpg`}
            alt="Quanty Icon Picture"
            objectFit="cover"
            layout="fill"
            placeholder="blur"
            blurDataURL="/quanty_128.jpg"
          />
        </div>
        <br />
        <Link href={StaticLinks.QUANTY_BOT_INVITE} passHref>
          <button className="my-2 w-44 rounded-lg bg-blue-500 px-5 py-2 text-white ">
            Invite Quanty
          </button>
        </Link>
        <Link href={StaticLinks.QUANTY_SERVER_INVITE} passHref>
          <button className="my-2 w-44 rounded-lg bg-blue-500 px-5 py-2 text-white ">
            Support Server
          </button>
        </Link>
        <Link href="/servers" passHref>
          <button className="my-2 w-44 rounded-lg bg-blue-500 px-5 py-2 text-white ">
            Dashboard (WIP)
          </button>
        </Link>
      </div>
    </div>
  )
}

export default TempHome
