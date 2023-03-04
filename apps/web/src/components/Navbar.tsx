import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { LOGO } from '@quanty/lib'

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

      <div className="flex gap-x-4">
        <ul className="hidden md:flex md:items-center md:space-x-6">
          <li className="rounded border border-transparent transition hover:border-theme-secondary">
            <Link href="/docs" className="px-2 py-1">
              Documentation
            </Link>
          </li>
          <li className="rounded border border-transparent transition hover:border-theme-secondary">
            <Link href="/dashboard" className="px-2 py-1">
              Dashboard
            </Link>
          </li>
          <li className="rounded border border-transparent transition hover:border-theme-secondary">
            <Link
              href="/discord"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1"
            >
              Join our Discord
            </Link>
          </li>

          <li>
            <Link
              href="/discord"
              target="_blank"
              rel="noreferrer"
              className="select-none rounded-lg border border-theme-secondary px-3 py-1 transition-all duration-200 ease-in-out hover:bg-theme-primary"
            >
              Invite
            </Link>
          </li>
        </ul>

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
            className="rounded-lg border bg-theme-primary px-3 py-1 transition-all duration-200 ease-in-out hover:bg-theme-secondary"
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
