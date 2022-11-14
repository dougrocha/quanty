import { ChevronDownIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRef, useState } from 'react'

import LoginButton from './buttons/loginButton'

import { useAuth, useOnClickOutside } from '../hooks'
import { FetchUserIcon } from '../libs/fetchUserIcon'

const UserProfileDropdownMenu = dynamic(import('./userProfileDropdownMenu'), {
  ssr: false,
})

interface IUserProfileTypes {
  small?: boolean
}

const UserProfile = ({ small }: IUserProfileTypes) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const { user, error, logOut } = useAuth()

  const closeDropdown = () => setOpen(false)

  useOnClickOutside(ref, closeDropdown)

  if (error) return <LoginButton />

  return (
    <>
      <div className={`flex items-center ${small && 'text-sm'}`} ref={ref}>
        <div
          className="flex items-center justify-center"
          onClick={() => setOpen(prev => !prev)}
        >
          {user ? (
            <>
              <Image
                className="rounded-full"
                src={FetchUserIcon(user?.id ?? '', user?.avatar ?? '')}
                alt="Quanty Icon Picture"
                width={40}
                height={40}
                priority
              />

              <strong className="ml-3 hidden sm:block">{user?.username}</strong>

              <p className="hidden opacity-75 sm:block">
                #{user?.discriminator}
              </p>
            </>
          ) : (
            <>
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300/50" />
              <div className="ml-3 hidden h-2 w-16 animate-pulse rounded-md bg-gray-300/50 sm:block" />
            </>
          )}

          <ChevronDownIcon
            className={`ml-2 w-4 text-secondary-white transition ${
              open && 'rotate-180'
            }`}
          />
        </div>
        {open && <UserProfileDropdownMenu setOpen={setOpen} logOut={logOut} />}
      </div>
    </>
  )
}

export default UserProfile

