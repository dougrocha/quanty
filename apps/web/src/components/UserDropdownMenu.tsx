import Image from 'next/image'
import Link from 'next/link'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { DefaultSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { DISCORD_LOGO } from '@quanty/lib'

const UserDropdownMenu = ({
  user,
}: {
  user?: { id: string } & DefaultSession['user']
}) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="group flex items-center">
        <Image
          src={user?.image ?? DISCORD_LOGO}
          alt={`${user?.name} profile image`}
          width={32}
          height={32}
          priority
          className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-theme-primary"
        />

        <ChevronUpIcon className="h-5 w-5 transition-transform group-radix-state-open:rotate-180" />
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="radix-side-bottom:animate-slide-up mx-6 my-2 w-48 rounded-lg bg-theme-neutral p-1 shadow-md md:w-56"
          sideOffset={5}
        >
          <DropdownMenuPrimitive.Item
            className="relative flex h-8 select-none items-center rounded-md px-1 pl-4 text-sm leading-3 outline-none radix-highlighted:bg-primary-purple-20"
            asChild
          >
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Separator className="my-1 h-px bg-primary-bright-purple" />

          <DropdownMenuPrimitive.Item
            className="relative flex h-8 cursor-pointer select-none items-center rounded-md px-1 pl-4 text-sm leading-3 outline-none radix-highlighted:bg-primary-purple-20"
            onClick={() => {
              signOut({ redirect: true, callbackUrl: '/' })
            }}
          >
            Logout
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

export default UserDropdownMenu
