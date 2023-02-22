import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { DefaultSession } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { DISCORD_LOGO } from '@quanty/lib'

import { api } from '~/api'

const Navbar = () => {
  const { data: session } = api.auth.getSession.useQuery()

  return (
    <nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-2 sm:px-4 lg:px-6">
      <Link href="/" className="no-select text-2xl uppercase">
        QUANTY
      </Link>
      <ul className="flex items-center space-x-10">
        <Link href="/commands">
          <li>Commands</li>
        </Link>
        <Link href="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_DISCORD_SERVER_INVITE_URL}
          target="_blank"
          rel="noreferrer"
        >
          <li>Join our Discord</li>
        </Link>
        <div className="flex gap-x-4">
          <Link
            href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="select-none rounded-lg border px-3 py-1 transition-all duration-200 ease-in-out hover:bg-theme-secondary"
          >
            <li>Invite</li>
          </Link>

          {session ? (
            <UserDropdownMenu user={session.user} />
          ) : (
            <button
              className="rounded-lg border bg-theme-primary px-3 py-1 transition-all duration-200 ease-in-out hover:bg-theme-secondary"
              onClick={() => {
                signIn('discord')
              }}
            >
              Log in
            </button>
          )}
        </div>
      </ul>
    </nav>
  )
}

const UserDropdownMenu = ({
  user,
}: {
  user: { id: string } & DefaultSession['user']
}) => {


  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="flex items-center group">
        <Image
          src={user.image ?? DISCORD_LOGO}
          alt={`${user.name} profile image`}
          width={32}
          height={32}
          priority
          className="h-8 w-8 shrink-0 overflow-hidden rounded-full"
        />
        <ChevronUpIcon
          className="h-5 w-5 transition-transform group-radix-state-open:rotate-180"
        />
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="radix-side-bottom:animate-slide-up m-2 w-48 rounded-lg bg-theme-neutral p-1 shadow-md md:w-56"
          sideOffset={5}
        >
          <DropdownMenuPrimitive.Item className="relative flex h-7 select-none items-center rounded-md px-1 pl-4 text-sm leading-3 outline-none radix-highlighted:bg-primary-purple-20">
            Dashboard
          </DropdownMenuPrimitive.Item>
          <DropdownMenuPrimitive.Item className="relative flex h-7 select-none items-center rounded-md px-1 pl-4 text-sm leading-3 outline-none radix-highlighted:bg-primary-purple-20">
            Settings
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

export default Navbar
