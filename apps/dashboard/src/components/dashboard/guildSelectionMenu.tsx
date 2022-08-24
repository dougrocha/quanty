import { PlusCircleIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import {
  MutualGuild,
  useGetMutualGuildsQuery,
} from '../../graphql/generated/schema'
import { useOnClickOutside } from '../../hooks'
import { FetchGuildIcon } from '../../libs/fetchGuildIcon'
import { mutualGuildsAtom } from '../../utils/atoms'
import { sidebarCollapsedAtom } from '../../utils/atoms/dashboardSidebarStatus'

const GuildSelectionMenu = () => {
  const ref = useRef(null)

  const {
    query: { guildId },
  } = useRouter()

  const [mutualGuilds, setMutualGuilds] = useAtom(mutualGuildsAtom)
  const sidebarShrinked = useAtomValue(sidebarCollapsedAtom)
  const [open, setOpen] = useState(false)

  useGetMutualGuildsQuery({
    onCompleted: ({ mutualGuilds }) => setMutualGuilds(mutualGuilds),
    fetchPolicy: 'cache-first',
  })

  useOnClickOutside(ref, () => setOpen(false))

  const guild = mutualGuilds?.find(({ id }) => id == guildId)

  return (
    <div
      className={`text-md relative my-5 flex h-12 w-full cursor-pointer select-none items-center rounded-lg border border-primary-purple-10 bg-primary-purple-10 py-2 px-3 ${
        open
          ? 'border border-primary-bright-purple'
          : 'hover:border hover:border-primary-bright-purple'
      } ${sidebarShrinked && 'justify-center'}`}
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <ChevronDownIcon
        className={`absolute right-2 h-6 w-6 transition-transform duration-300 ${
          open ? 'rotate-180' : 'rotate-0'
        } ${sidebarShrinked && 'hidden'}`}
      />

      <div className="h-6 w-6 flex-shrink-0">
        <Image
          className="rounded-full"
          alt={`Current chosen guild icon`}
          src={FetchGuildIcon(guild?.id ?? 'Undefined', guild?.icon)}
          priority
          width={28}
          height={28}
        />
      </div>

      <p
        className={`${
          sidebarShrinked && 'hidden'
        } mr-7 ml-2 origin-left truncate duration-200`}
      >
        {guild?.name}
      </p>

      {open && (
        <GuildSelectionDropdown
          sidebarShrinked={sidebarShrinked}
          mutualGuilds={mutualGuilds}
        />
      )}
    </div>
  )
}

interface IGuildSelectDropdown {
  sidebarShrinked: boolean
  mutualGuilds: MutualGuild[] | null
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
                className={`flex w-full cursor-pointer items-center justify-center ${
                  sidebarShrinked ? 'justify-center px-1 py-3' : 'p-5 py-4'
                }`}
                onClick={() => handleGuildChange(guild.id)}
              >
                <Image
                  className="rounded-full"
                  alt={`Guild icon for ${guild.name}`}
                  src={FetchGuildIcon(guild?.id ?? 'Undefined', guild?.icon)}
                  loading="lazy"
                  width={24}
                  height={24}
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
          className={`flex w-full cursor-pointer items-center justify-center py-3 ${
            sidebarShrinked ? 'justify-center' : ' px-5'
          }`}
        >
          <PlusCircleIcon className="h-6 w-6" />

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

export default GuildSelectionMenu
