import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import GuildSelectionDropdown from './guildSelectionDropdown'

import { useGetMutualGuildsQuery } from '../../graphql/generated/schema'
import { useCurrentGuildId, useOnClickOutside } from '../../hooks'
import { FetchGuildIcon } from '../../libs/fetchGuildIcon'
import { mutualGuildsAtom } from '../../utils/atoms'
import { sidebarCollapsedAtom } from '../../utils/atoms/dashboardSidebarStatus'

const GuildSelectionMenu = () => {
  const ref = useRef(null)

  const guildId = useCurrentGuildId()

  const sidebarShrinked = useAtomValue(sidebarCollapsedAtom)
  const [open, setOpen] = useState(false)

  const { data } = useGetMutualGuildsQuery({
    fetchPolicy: 'cache-first',
  })
  const mutualGuilds = data?.mutualGuilds

  const guild = mutualGuilds?.find(({ id }) => id == guildId)

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
          mutualGuilds={mutualGuilds}
        />
      )}
    </div>
  )
}

export default GuildSelectionMenu
