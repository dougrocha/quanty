import { useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'

import { Guild } from '../graphql/generated/schema'
import { FetchGuildIcon } from '../libs/FetchIcons'
import { StaticLinks } from '../utils/constants/API'
import { currentGuildAtom } from '../utils/store/currentGuild'

interface GuildCardProps {
  guild: Guild
}

export const GuildCard = ({ guild }: GuildCardProps) => {
  const setCurrentGuild = useSetAtom(currentGuildAtom)

  const { id, icon, name, bot } = guild

  return (
    <div
      key={`guild-${id}`}
      className="relative m-2 flex h-52 w-80 flex-col items-center justify-end overflow-hidden rounded-xl"
      onClick={() => setCurrentGuild(guild)}
    >
      <Image
        className="blur-sm"
        alt={`guild icon for ${name}`}
        src={FetchGuildIcon(id, icon)}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute top-6 border-solid">
        <Image
          className="rounded-full"
          alt={`guild icon for ${name}`}
          src={FetchGuildIcon(id, icon)}
          width={100}
          height={100}
          priority
        />
      </div>
      <div className="z-10 flex w-full items-center justify-between rounded-b-xl bg-primary-purple-10 p-3">
        <div>
          <div className="">{name}</div>
          <div className=" text-sm text-secondary-white">
            {bot ? 'Owner' : 'Admin'}
          </div>
        </div>
        {bot ? (
          <Link
            href={{
              pathname: '/dashboard/[guildId]',
              query: { guildId: id },
            }}
          >
            <a className="rounded-lg bg-primary-bright-purple py-2 px-5">
              Edit
            </a>
          </Link>
        ) : (
          <Link href={`${StaticLinks.QUANTY_BOT_INVITE}`}>
            <a className="rounded-lg bg-primary-purple-6 py-2 px-5">Set up</a>
          </Link>
        )}
      </div>
    </div>
  )
}
