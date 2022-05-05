import Image from 'next/image'
import Link from 'next/link'

import { FetchGuildIcon } from '../libs/FetchIcons'

interface GuildCardProps {
  id: string
  name: string
  icon: string | null | undefined
}

export const GuildCard = ({ id, name, icon }: GuildCardProps) => {
  return (
    <div
      key={`guild-${id}`}
      className="relative m-2 flex h-44 w-72 flex-col items-center justify-end "
    >
      <Image
        className="rounded-xl border-8 border-solid border-red-600"
        src={FetchGuildIcon(id, icon)}
        layout="fill"
        objectFit="cover"
      />
      <div className="z-10 flex w-full items-center justify-between rounded-b-xl bg-primary-purple-20 p-3">
        <div>
          <div className="">{name}</div>
          <div className=" text-sm">Owner</div>
        </div>
        <Link
          href={{
            pathname: '/dashboard/[guildId]',
            query: { guildId: id },
          }}
        >
          <a className="rounded-lg bg-primary-bright-purple py-2 px-5">Go</a>
        </Link>
      </div>
    </div>
  )
}
