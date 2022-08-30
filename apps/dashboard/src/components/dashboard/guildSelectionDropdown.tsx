import { PlusIcon } from '@heroicons/react/outline'
import Image from 'next/future/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MutualGuild } from '../../graphql/generated/schema'
import { FetchGuildIcon } from '../../libs/fetchGuildIcon'

interface IGuildSelectDropdown {
  sidebarShrinked: boolean
  mutualGuilds?: MutualGuild[]
}

const GuildSelectionDropdown = ({
  sidebarShrinked,
  mutualGuilds,
}: IGuildSelectDropdown) => {
  const {
    query: { guildId },
    push,
  } = useRouter()

  const handleGuildChange = async (id: string) => {
    push({
      href: `/dashboard/${id}`,
      query: {
        guildId: id,
      },
    })
  }

  return (
    <div className="absolute top-14 left-0 min-w-full overflow-x-hidden text-sm">
      <ul className="w-full rounded-lg bg-primary-purple-10">
        {mutualGuilds?.map(guild => (
          <li key={guild.id}>
            {guild.id != guildId && guild.bot && (
              <div
                className={`flex w-full cursor-pointer items-center justify-start ${
                  sidebarShrinked ? 'justify-center px-1 py-3' : 'p-5 py-4'
                }`}
                onClick={() => handleGuildChange(guild.id)}
              >
                <Image
                  className="rounded-full"
                  src={FetchGuildIcon(guild?.id ?? 'Undefined', guild?.icon)}
                  alt={`Guild icon for ${guild.name}`}
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <p className={`${!sidebarShrinked ? 'ml-3 block' : 'hidden'}`}>
                  {guild?.name}
                </p>
              </div>
            )}
          </li>
        ))}
        <hr className="mx-5 rounded border-primary-bright-purple" />
        <li
          className={`flex w-full cursor-pointer items-center justify-start py-3 uppercase text-gray-200 ${
            sidebarShrinked ? 'justify-center' : ' px-5'
          }`}
        >
          <PlusIcon className="h-6 w-6 text-gray-200" />

          {!sidebarShrinked && (
            <Link href={process.env.NEXT_PUBLIC_QUANTY_DISCORD_BOT_INVITE}>
              <a className="ml-3">Add a new server</a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default GuildSelectionDropdown
