import { ChevronDownIcon } from '@heroicons/react/outline'
import { useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRef, useState } from 'react'

import LoginButton from './Buttons/LoginButton'

import { useOnClickOutside } from '../hooks'
import { FetchUserIcon } from '../libs/FetchIcons'
import { currentUserAtom } from '../utils/store'

const UserProfileDropdownMenu = dynamic(import('./UserProfileDropdownMenu'))

interface IUserProfileTypes {
  small?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserProfile = ({ small }: IUserProfileTypes) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const user = useAtomValue(currentUserAtom)

  const closeDropdown = () => setOpen(false)

  useOnClickOutside(ref, closeDropdown)

  if (!user) return <LoginButton />

  return (
    <>
      <div className={`flex items-center ${small && 'text-sm'}`} ref={ref}>
        <div
          className="flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <div className="avatar">
            <div className="rounded-full">
              <Image
                src={FetchUserIcon(user?.id ?? '', user?.avatar ?? '')}
                alt="Quanty Icon Picture"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL="/basic_discord_logo.png"
              />
            </div>
          </div>
          <strong className="ml-3 hidden sm:block">{user.username}</strong>

          <p className="hidden opacity-75 sm:block">#{user.discriminator}</p>

          <ChevronDownIcon
            className={`ml-2 w-4 text-secondary-white transition ${
              open && 'rotate-180'
            }`}
          />
        </div>
        {open && <UserProfileDropdownMenu />}
      </div>
    </>
  )
}

export default UserProfile
