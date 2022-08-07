import Link from 'next/link'

const UserProfileDropdownMenu = ({
  setOpen,
  logOut,
}: {
  setOpen: (boolean: boolean) => void
  logOut: () => void
}) => {
  return (
    <ul className="absolute top-16 right-8 z-50 mt-2 w-40 overflow-hidden rounded-md border-none bg-primary-purple-10 text-sm text-secondary-white shadow-xl xl:right-auto">
      {DropdownMenuItems.map((item, index) => {
        return (
          <Link key={index} href={item.path} passHref>
            <li
              className=" h-full w-full cursor-pointer px-5 py-2 no-underline hover:bg-primary-pale-purple"
              onClick={() => {
                setOpen(false)
              }}
            >
              <a>{item.name}</a>
            </li>
          </Link>
        )
      })}
      <Link href={`${process.env.NEXT_PUBLIC_QUANTY_API_URL}/api/auth/logout`}>
        <li
          className="cursor-pointer px-5 py-2 text-red-500 no-underline hover:bg-primary-pale-purple"
          onClick={() => {
            setOpen(false)
            logOut()
          }}
        >
          <a>Log Out</a>
        </li>
      </Link>
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
