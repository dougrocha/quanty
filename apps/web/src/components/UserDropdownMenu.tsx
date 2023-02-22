import Image from 'next/image'
import Link from 'next/link'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { DefaultSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { DISCORD_LOGO } from '@quanty/lib'

const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

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
          placeholder="blur"
          blurDataURL={rgbDataURL(102, 53, 204)}
        />

        <ChevronUpIcon className="h-5 w-5 transition-transform group-radix-state-open:rotate-180" />
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="radix-side-bottom:animate-slide-up m-2 w-48 rounded-lg bg-theme-neutral p-1 shadow-md md:w-56"
          sideOffset={5}
        >
          <DropdownMenuPrimitive.Item
            className="relative flex h-7 select-none items-center rounded-md px-1 pl-4 text-sm leading-3 outline-none radix-highlighted:bg-primary-purple-20"
            asChild
          >
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Separator className="my-1 h-px bg-primary-bright-purple" />

          <DropdownMenuPrimitive.Item className="relative flex h-7 select-none items-center rounded-md px-1 pl-4 text-sm leading-3 outline-none radix-highlighted:bg-primary-purple-20">
            <button
              onClick={() => {
                signOut({ redirect: false, callbackUrl: '/' })
              }}
            >
              Logout
            </button>
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

export default UserDropdownMenu
