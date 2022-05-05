import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { ArrowIcon } from './icons'

import useOnClickOutside from '../hooks/useOnClickOutside'
import { FetchUserIcon } from '../libs/FetchIcons'
import { currentUserAtom } from '../pages'
import { QUANTY_API } from '../utils/constants/API'
import { CurrentUser } from '../utils/types'

interface userProfileTypes {
  user: CurrentUser
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserProfile = ({ user }: userProfileTypes) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const closeDropdown = () => setOpen(false)

  useOnClickOutside(ref, closeDropdown)

  const [, setUser] = useAtom(currentUserAtom)

  return (
    <>
      <div className="flex items-center" ref={ref}>
        <div
          className="flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={FetchUserIcon(user.discordId, user.avatar)}
              alt="Quanty Icon Picture"
              objectFit="cover"
              layout="fill"
              placeholder="blur"
              blurDataURL="/basic_discord_logo.png"
            />
          </div>
          <strong className="ml-3">{user.username}</strong>

          <p className="opacity-75">#{user.discriminator}</p>

          <ArrowIcon
            width={25}
            className={`transition ${open && 'rotate-180'}`}
          />
        </div>
        {open && <DropdownMenu setUser={setUser} />}
      </div>
    </>
  )
}

interface DropdownProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  setUser: (
    update:
      | CurrentUser
      | typeof RESET
      | ((prev: CurrentUser | null) => CurrentUser | null)
      | null,
  ) => void
}

const DropdownMenu = ({ setUser }: DropdownProps) => {
  return (
    <ul className="absolute top-16 z-50 mt-2 w-40 overflow-hidden rounded-xl border-none bg-primary-purple-10 text-sm text-secondary-white">
      {DropdownMenuItems.map((item, index) => {
        return (
          <li key={index} className="mr-3 ml-3 p-2 no-underline">
            <Link href={item.path}>{item.name}</Link>
          </li>
        )
      })}
      <li className="mr-3 ml-3 p-2 text-red-500 no-underline">
        <Link href={`${QUANTY_API}/api/auth/logout`}>
          <a onClick={() => setUser}>Log Out</a>
        </Link>
      </li>
    </ul>
  )
}

interface IDropdownMenuItems {
  name: string
  path: string
}

export const DropdownMenuItems: IDropdownMenuItems[] = [
  {
    name: 'My Servers',
    path: '/dashboard',
  },
  {
    name: 'Changelogs',
    path: '/docs',
  },
]

export default UserProfile
