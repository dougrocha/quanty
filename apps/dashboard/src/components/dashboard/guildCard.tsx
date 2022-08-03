import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MutualGuild } from '../../graphql/generated/schema'
import { FetchGuildIcon } from '../../libs/FetchIcons'

interface GuildCardProps {
  guild: MutualGuild
}

export const GuildCard = ({ guild }: GuildCardProps) => {
  const { id, icon, name, bot } = guild

  const { push } = useRouter()

  return (
    <div
      key={`guild-${id}`}
      className="relative flex h-52 w-full flex-col items-center justify-end overflow-hidden rounded-xl sm:w-80 md:m-2"
      onClick={() => push(`/dashboard/${id}`)}
    >
      <Image
        className="blur-sm"
        alt={`guild icon for ${name}`}
        src={FetchGuildIcon(id, icon)}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="flex w-full items-center justify-center">
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
            <p>{name}</p>
            <p className=" text-sm text-secondary-white">
              {bot ? 'Owner' : 'Admin'}
            </p>
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
            <Link href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE}>
              <a className="rounded-lg bg-primary-purple-6 py-2 px-5">Set up</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export const GuildCardSkeleton = () => {
  return (
    <div className="h-52 w-full animate-pulse overflow-hidden rounded-xl bg-gray-300/50 opacity-50 sm:w-80 md:m-2" />
  )
}
