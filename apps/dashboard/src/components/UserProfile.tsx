import { ReactiveVar } from '@apollo/client'
import { useAtom, useSetAtom } from 'jotai'
import { RESET, useResetAtom } from 'jotai/utils'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEvent, useRef, useState } from 'react'

import useOnClickOutside from '../hooks/useOnClickOutside'
import { CheckNullProfileImg } from '../libs/ProfileImg'
import { currentUserAtom } from '../pages'
import { CurrentUser } from '../utils/types'

interface userProfileTypes {
  user?: CurrentUser
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserProfile = ({ user }: userProfileTypes) => {
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const { discriminator, icon, id, username } = {
    id: '571520537587875851',
    username: '123123',
    discriminator: '123123',
    icon: 'a_6fa57f0e6df7872fa3f7a71839364b40',
  }

  const closeDropdown = () => setOpen(false)

  useOnClickOutside(ref, closeDropdown)

  const [, setUser] = useAtom(currentUserAtom)

  // TODO: Turn down opacity on user.discriminator
  // Also add arrow button to thing

  return (
    <>
      <div className="flex items-center" ref={ref}>
        <div
          className="flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={CheckNullProfileImg(id, icon)}
              alt="Quanty Icon Picture"
              objectFit="cover"
              layout="fill"
              placeholder="blur"
              blurDataURL="/basic_discord_logo.png"
            />
          </div>
          <strong>{username}</strong>

          <p className="opacity-75">#{discriminator}</p>
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
  // TODO: Animate with framer js, for smooth dropdown box
  return (
    <div className="absolute top-14 z-50 w-40 overflow-hidden rounded-lg border-2 border-solid border-primary-purple-20">
      <div className="mt-1 flex flex-col">
        <hr />
        <Link href="http://localhost:3001/api/auth/logout">
          <a className="pt-2 no-underline" onClick={() => setUser}>
            Log Out
          </a>
        </Link>
      </div>
    </div>
  )
}

export default UserProfile
