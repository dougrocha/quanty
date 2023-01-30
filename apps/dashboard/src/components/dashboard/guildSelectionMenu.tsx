import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRef, useState } from 'react'

import GuildSelectionDropdown from './guildSelectionDropdown'

import { useGetMutualGuildsQuery } from '../../graphql/generated/schema'
import { useOnClickOutside } from '../../hooks'
import { FetchGuildIcon } from '../../libs/fetchGuildIcon'
import { sidebarCollapsedAtom } from '../../utils/atoms/dashboardSidebarStatus'
import { currentGuildIdAtom } from '../../utils/atoms/guild'

const GuildSelectionMenu = () => {
  const ref = useRef(null)

  const { data } = useGetMutualGuildsQuery()

  const guildId = useAtomValue(currentGuildIdAtom)

  const sidebarShrinked = useAtomValue(sidebarCollapsedAtom)
  const [open, setOpen] = useState(false)

  const guild = data?.mutualGuilds?.find(({ id }) => id == guildId)

  useOnClickOutside(ref, () => setOpen(false))

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

      <Image
        className="flex-shrink-0 rounded-full"
        alt={`Current chosen guild icon`}
        src={FetchGuildIcon(guild?.id ?? 'Undefined', guild?.icon)}
        width={28}
        height={28}
        priority
      />

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
          mutualGuilds={data?.mutualGuilds}
        />
      )}
    </div>
  )
}

export default GuildSelectionMenu

