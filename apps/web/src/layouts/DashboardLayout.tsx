import { LOGO } from '@quanty/lib'

import 'react-loading-skeleton/dist/skeleton.css'
import { Fragment, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react'
import { useSession } from 'next-auth/react'

import UserDropdownMenu from '~/components/UserDropdownMenu'
import { api } from '~/api'
import getGuildIcon from '~/lib/getGuildIcon'
import { currentGuildAtom } from '~/lib/guildStore'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const { status } = useSession({
    required: true,

    onUnauthenticated: () => {
      router.push({
        pathname: '/login',
        query: {
          redirect: router.asPath,
        },
      })
    },
  })

  const setCurrentGuild = useSetAtom(currentGuildAtom)

  useEffect(() => {
    if (!router.query.guildId) {
      setCurrentGuild(undefined)
    }
  }, [router.query.guildId, setCurrentGuild])

  api.user.getManagedGuilds.useQuery(undefined, {
    enabled: status === 'authenticated',
    onSuccess: data => {
      if (router.query.guildId) {
        const routerGuild = data.find(
          guild => guild.id === router.query.guildId,
        )
        setCurrentGuild(routerGuild)
      } else {
        setCurrentGuild(undefined)
        router.push({
          pathname: '/dashboard',
        })
      }
    },
  })

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <DashboardNavbar />
      <div
        className={`h-full w-full flex-auto overflow-y-scroll rounded-t-3xl bg-dark-purple-700 p-6 shadow-[0px_8px_16px_#C335F0]`}
      >
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

const GuildSelectionBox = () => {
  const [currentGuild, setCurrentGuild] = useAtom(currentGuildAtom)

  const { data: guilds } = api.user.getManagedGuilds.useQuery(undefined, {
    enabled: !!currentGuild,
  })

  return (
    <div className="relative w-56 max-w-sm">
      <Listbox value={currentGuild} by="id" onChange={setCurrentGuild}>
        <Listbox.Button
          className="relative flex h-9 w-full cursor-default items-center space-x-3 overflow-auto rounded-lg bg-theme-neutral pr-8 text-left shadow-md focus:outline-none focus-visible:border-theme-secondary focus-visible:ring-2 focus-visible:ring-theme-primary
            focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-secondary sm:text-sm"
        >
          <Image
            src={getGuildIcon(currentGuild) ?? '/images/discord_logo.png'}
            alt="Quanty Profile Image"
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="block truncate">{currentGuild?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-300 transition-transform duration-200 ui-open:-rotate-180"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute inset-x-0 top-10 mt-4 flex max-h-60 flex-col overflow-auto rounded-md bg-theme-base text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
            {guilds?.map(guild => (
              <Listbox.Option
                key={guild.id}
                value={guild}
                className={({ active }) =>
                  `group relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-dark-purple-300 text-white' : 'text-gray-200'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate group-hover:text-white ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {guild.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-theme-success">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
            <span className="flex items-center border-t-2 border-t-dark-purple-300 p-2 font-medium">
              <PlusCircleIcon
                className="mr-2 h-6 w-6 text-theme-secondary"
                aria-hidden="true"
              />
              Invite to server...
            </span>
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}

const DashboardNavbar = () => {
  const { data: session } = api.auth.getSession.useQuery()

  const currentGuild = useAtomValue(currentGuildAtom)

  return (
    <div className="flex h-20 shrink-0 items-center justify-between bg-theme-base px-4">
      <Link href="/">
        <Image
          src={LOGO.sm}
          alt="Quanty Profile Image"
          width={40}
          height={40}
          priority
          className="h-10 w-10 overflow-hidden rounded-full shadow-md shadow-theme-primary"
        />
      </Link>

      {currentGuild ? <GuildSelectionBox /> : null}

      <UserDropdownMenu user={session?.user} />
    </div>
  )
}
