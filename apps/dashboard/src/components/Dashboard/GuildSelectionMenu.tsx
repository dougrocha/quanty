import { PlusCircleIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import {
  MutualGuild,
  useGetMutualGuildsQuery,
} from '../../graphql/generated/schema'
import { useOnClickOutside } from '../../hooks'
import { FetchGuildIcon } from '../../libs/FetchIcons'
import { StaticLinks } from '../../utils/constants/API'
import { mutualGuildsAtom } from '../../utils/store'
import { dashboardDrawerShinkToggleAtom } from '../../utils/store/dashboardSidebarStatus'

const GuildSelectionMenu = () => {
  const {
    query: { guildId },
    isReady,
  } = useRouter()

  const [mutualGuilds, setMutualGuilds] = useAtom(mutualGuildsAtom)
  const sidebarShrinked = useAtomValue(dashboardDrawerShinkToggleAtom)

  useGetMutualGuildsQuery({
    onCompleted: ({ mutualGuilds }) => setMutualGuilds(mutualGuilds),
    fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    if (!isReady) return
  }, [isReady])

  const ref = useRef(null)

  const guild = mutualGuilds?.find(({ id }) => id == guildId)

  const closeDropdown = () => setOpen(false)

  useOnClickOutside(ref, closeDropdown)

  const [open, setOpen] = useState(false)

  return (
    <div
      className={`text-md relative my-5 flex h-12 cursor-pointer select-none items-center justify-center rounded-lg border border-primary-purple-10 bg-primary-purple-10 py-2 px-3 ${
        open
          ? 'border border-primary-bright-purple'
          : 'hover:border hover:border-primary-bright-purple'
      }`}
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <Image
        className="rounded-full"
        alt={`Current chosen guild icon`}
        src={FetchGuildIcon(guild?.id ?? 'Undefined', guild?.icon)}
        priority
        width={24}
        height={24}
      />

      {!sidebarShrinked && (
        <>
          <p className={`ml-3 flex-shrink truncate whitespace-nowrap`}>
            {guild?.name}
          </p>
          <ChevronDownIcon
            className={`ml-auto w-6 transition-transform duration-300 ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </>
      )}
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
    <div className="absolute top-14 min-w-full overflow-x-hidden text-sm">
      <ul className="w-full rounded-lg bg-primary-purple-10">
        {mutualGuilds?.map(guild => (
          <li key={guild.id}>
            {guild.id != guildId && guild.bot && (
              <div
                className={`flex w-full cursor-pointer items-center ${
                  sidebarShrinked ? 'justify-center px-1 py-3' : 'p-5 py-4'
                }`}
              >
                <Image
                  className="rounded-full"
                  alt={`Guild icon for ${guild.name}`}
                  src={FetchGuildIcon(guild?.id ?? 'Undefined', guild?.icon)}
                  loading="lazy"
                  width={24}
                  height={24}
                />
                <p
                  className={`${!sidebarShrinked ? 'ml-3 block' : 'hidden'}`}
                  onClick={() => handleGuildChange(guild.id)}
                >
                  {guild?.name}
                </p>
              </div>
            )}
          </li>
        ))}
        <hr className="mx-7 rounded border-primary-bright-purple" />
        <li
          className={`flex w-full cursor-pointer items-center justify-start py-3 ${
            sidebarShrinked ? 'justify-center' : ' px-5'
          }`}
        >
          <PlusCircleIcon className="h-6 w-6" />

          {!sidebarShrinked && (
            <Link href={StaticLinks.QUANTY_BOT_INVITE}>
              <a className="ml-3">Add a new server</a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default GuildSelectionMenu
