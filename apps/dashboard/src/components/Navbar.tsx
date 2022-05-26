import { useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import { NavLinks } from '../data/navLinks'
import { StaticLinks } from '../utils/constants/API'
import { currentUserAtom } from '../utils/store/currentUser'

const UserProfile = dynamic(import('./UserProfile'), { ssr: false })

const Navbar = () => {
  const handleLogin = () => {
    window.location.assign(StaticLinks.QUANTY_API + '/api/auth/login')
  }

  const user = useAtomValue(currentUserAtom)

  return (
    <nav className="flex h-20 items-center justify-between text-sm ">
      <ul className="flex space-x-5">
        {NavLinks.map((link, index) => {
          return (
            <li key={index}>
              <Link href={link.path}>
                <a>{link.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
      <div>
        {user ? (
          <UserProfile />
        ) : (
          <button
            className="rounded-2xl bg-primary-bright-purple py-2 px-4"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
