import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { LOGO } from '@quanty/lib'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'

const UserDropdownMenu = dynamic(() => import('./UserDropdownMenu'))

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/">
        <Image
          src={LOGO.sm}
          alt="Quanty Profile Image"
          width={40}
          height={40}
          priority
          className="h-10 w-10 overflow-hidden rounded-full shadow-md shadow-theme-primary"
        />
      </Link>

      <div className="flex items-center gap-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={'/docs'} className={navigationMenuTriggerStyle}>
                  Documentation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href={'/dashboard'}
                  className={navigationMenuTriggerStyle}
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/discord"
                  target="_blank"
                  rel="noreferrer"
                  className={navigationMenuTriggerStyle}
                >
                  Join our Discord
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/discord"
                  target="_blank"
                  rel="noreferrer"
                  className={navigationMenuTriggerStyle}
                >
                  Invite
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {session && status === 'authenticated' ? (
          <UserDropdownMenu user={session.user} />
        ) : null}

        {status === 'loading' ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-theme-primary" />
          </div>
        ) : null}

        {status === 'unauthenticated' ? (
          <button
            className="h-9 rounded-md border bg-theme-primary px-2 text-sm transition-all duration-200 ease-in-out hover:bg-theme-secondary"
            onClick={() => {
              signIn('discord')
            }}
          >
            Log in
          </button>
        ) : null}
      </div>
    </nav>
  )
}

export default Navbar
