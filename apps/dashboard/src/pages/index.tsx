import Image from 'next/image'
import Link from 'next/link'

import HomeLayout from '../layouts/Home'
import { StaticLinks } from '../utils/staticLinks'

const Home = () => {
  return (
    <HomeLayout>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full">
          <Image
            src={`${StaticLinks.DISCORD_CDN}/app-assets/824106276404854844/941227160679624745.png?size=256`}
            alt="Quanty Icon Picture"
            objectFit="cover"
            layout="fill"
            priority
            placeholder="blur"
            blurDataURL="/quanty-64.png"
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
    </HomeLayout>
  )
}

export default Home
