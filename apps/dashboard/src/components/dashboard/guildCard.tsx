import Image from 'next/future/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import { MutualGuild } from '../../graphql/generated/schema'
import { FetchGuildIcon } from '../../libs/fetchGuildIcon'

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
        fill
        priority
      />
      <div className="flex w-full items-center justify-center">
        <div className="absolute top-6 border-solid">
          <Image
            className="rounded-full"
            alt={`guild icon for ${name}`}
            src={FetchGuildIcon(id, icon)}
            width={96}
            height={96}
            priority
          />
        </div>
        <div className="z-10 flex w-full items-center justify-between rounded-b-xl bg-primary-purple-10 p-3">
          <div>
            <p>{name}</p>
            <p className="text-xs font-semibold uppercase text-secondary-white">
              {bot ? 'Owner' : 'Admin'}
            </p>
          </div>

          <GuildCardButton
            text={bot ? 'Edit' : 'Set up'}
            href={
              bot
                ? {
                    pathname: '/dashboard/[guildId]',
                    query: { guildId: id },
                  }
                : process.env.NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE
            }
            bot={bot}
          />
        </div>
      </div>
    </div>
  )
}

const GuildCardButton = ({
  text,
  href,
  bot,
}: {
  text: string
  href: LinkProps['href']
  bot: boolean
}) => {
  return (
    <Link href={href}>
      <a
        className={`rounded-lg py-2 px-5 ${
          bot ? 'bg-primary-bright-purple' : 'bg-primary-purple-6'
        }`}
      >
        {text}
      </a>
    </Link>
  )
}

export const GuildCardSkeleton = () => {
  return (
    <div className="h-52 w-full animate-pulse overflow-hidden rounded-xl bg-gray-300/50 opacity-50 sm:w-80 md:m-2" />
  )
}
