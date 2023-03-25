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

// TODO: Add a dropdown box for navbar items when the screen is small

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className="flex justify-between items-center px-4 mx-auto w-full max-w-screen-2xl h-16 sm:px-6 lg:px-8">
      <Link href="/" className='shrink-0'>
        <Image
          src={LOGO.sm}
          alt="Quanty Profile Image"
          width={40}
          height={40}
          priority
          className="overflow-hidden w-10 h-10 rounded-full shadow-md shadow-theme-primary"
        />
      </Link>

      <div className="flex gap-x-4 items-center">
        <NavigationMenu className='hidden md:flex md:gap-x-4 md:items-center'>
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
          <div className="flex justify-center items-center">
            <div className="w-5 h-5 rounded-full border-b-2 animate-spin border-theme-primary" />
          </div>
        ) : null}

        {status === 'unauthenticated' ? (
          <button
            className="px-2 h-9 text-sm rounded-md border transition-all duration-200 ease-in-out shrink-0 bg-theme-primary hover:bg-theme-secondary"
            onClick={() => {
              void signIn('discord')
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
