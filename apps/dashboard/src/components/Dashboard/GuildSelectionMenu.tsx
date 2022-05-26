import { PlusCircleIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { useGetMutualGuildsQuery } from '../../graphql/generated/schema'
import { useOnClickOutside } from '../../hooks'
import { FetchGuildIcon } from '../../libs/FetchIcons'
import { StaticLinks } from '../../utils/constants/API'
import { mutualGuildsAtom, currentGuildAtom } from '../../utils/store'

const GuildSelectionMenu = () => {
  const router = useRouter()

  const [mutualGuilds, setMutualGuilds] = useAtom(mutualGuildsAtom)
  const [currentGuild, setCurrentGuild] = useAtom(currentGuildAtom)

  useGetMutualGuildsQuery({
    onCompleted: ({ mutualGuilds }) => setMutualGuilds(mutualGuilds as never),
    fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  const ref = useRef(null)

  const handleGuildChange = async (id: string) => {
    const guild = mutualGuilds?.find(guild => guild.id === id)

    if (!guild) return

    setCurrentGuild(guild)

    router.push({
      href: `/dashboard/${currentGuild?.id}`,
      query: {
        guildId: guild.id,
      },
    })
  }

  const closeDropdown = () => setOpen(false)

  useOnClickOutside(ref, closeDropdown)

  const [open, setOpen] = useState(false)

  return (
    <div
      className={`text-md relative m-5 my-5 flex h-12 cursor-pointer items-center justify-center rounded-lg border border-primary-purple-10 bg-primary-purple-10 py-2 px-3 hover:border hover:border-primary-bright-purple ${
        open && 'border border-primary-bright-purple '
      }`}
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <Image
        className="rounded-full"
        alt={`Current chosen guild`}
        src={FetchGuildIcon(
          currentGuild?.id ?? 'Undefined',
          currentGuild?.icon,
        )}
        priority
        width={25}
        height={25}
      />
      <p className="ml-3">{currentGuild?.name}</p>
      <ChevronDownIcon
        className={`ml-auto w-6 transition duration-300 ${
          open && 'rotate-180'
        }`}
      />
      {open && (
        <div className="absolute top-14 w-full">
          <ul className="w-full rounded-lg bg-primary-purple-10">
            {mutualGuilds?.map(guild => (
              <li key={guild.id}>
                {guild.id != currentGuild?.id && guild.bot && (
                  <div className="flex w-full cursor-pointer items-center p-5 py-4 text-sm">
                    <Image
                      className="rounded-full shadow"
                      alt={`Guild icon for ${guild.name}`}
                      src={FetchGuildIcon(
                        guild?.id ?? 'Undefined',
                        guild?.icon,
                      )}
                      loading="lazy"
                      width={25}
                      height={25}
                    />
                    <p
                      className="ml-3"
                      onClick={() => handleGuildChange(guild.id)}
                    >
                      {guild?.name}
                    </p>
                  </div>
                )}
              </li>
            ))}
            <div />
            <li className="flex w-full cursor-pointer items-center py-3 px-5 text-sm">
              <PlusCircleIcon className="h-7 w-7" />

              <Link href={StaticLinks.QUANTY_BOT_INVITE}>
                <a className="ml-3">Add a new server</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default GuildSelectionMenu
