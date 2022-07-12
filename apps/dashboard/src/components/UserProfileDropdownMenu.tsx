import Link from 'next/link'

import { useAuth } from '../hooks'
import { StaticLinks } from '../utils/constants/API'

const UserProfileDropdownMenu = () => {
  const { logOut } = useAuth()

  return (
    <ul className="absolute top-16 right-8 z-50 mt-2 w-40 overflow-hidden rounded-md border-none bg-primary-purple-10 text-sm text-secondary-white shadow-xl xl:right-auto">
      {DropdownMenuItems.map((item, index) => {
        return (
          <li key={index} className="mr-3 ml-3 p-2 no-underline">
            <Link href={item.path}>{item.name}</Link>
          </li>
        )
      })}
      <li className="mr-3 ml-3 p-2 text-red-500 no-underline">
        <Link href={`${StaticLinks.QUANTY_API}/api/auth/logout`}>
          <a onClick={() => logOut}>Log Out</a>
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
