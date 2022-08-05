import Link from 'next/link'

const UserProfileDropdownMenu = ({
  setOpen,
}: {
  setOpen: (boolean: boolean) => void
}) => {
  return (
    <ul className="absolute top-16 right-8 z-50 mt-2 w-40 overflow-hidden rounded-md border-none bg-primary-purple-10 text-sm text-secondary-white shadow-xl xl:right-auto">
      {DropdownMenuItems.map((item, index) => {
        return (
          <li
            key={index}
            className=" h-full w-full cursor-pointer px-5 py-2 no-underline hover:bg-primary-pale-purple"
            onClick={() => {
              setOpen(false)
            }}
          >
            <Link href={item.path}>
              <a>{item.name}</a>
            </Link>
          </li>
        )
      })}
      <li className="cursor-pointer px-5 py-2 text-red-500 no-underline hover:bg-primary-pale-purple">
        <Link
          href={`${process.env.NEXT_PUBLIC_QUANTY_API_URL}/api/auth/logout`}
        >
          <a>Log Out</a>
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
