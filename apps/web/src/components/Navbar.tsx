import Link from 'next/link'
import { signIn } from 'next-auth/react'

import { api } from '~/api'
import UserDropdownMenu from './UserDropdownMenu'

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
        <Link href="/discord" target="_blank" rel="noreferrer">
          <li>Join our Discord</li>
        </Link>
        <div className="flex gap-x-4">
          <Link
            href="/discord"
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

export default Navbar