import Link from 'next/link'
import { SetStateAction } from 'react'

import { StaticLinks } from '../utils/constants/API'
import { CurrentUser } from '../utils/types'

interface IUserProfileDropdownMenuProps {
  setUser: (update: SetStateAction<CurrentUser | null>) => void
}

const UserProfileDropdownMenu = ({
  setUser,
}: IUserProfileDropdownMenuProps) => {
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
        <Link href={`${StaticLinks.QUANTY_API}/api/auth/logout`}>
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

export default UserProfileDropdownMenu
