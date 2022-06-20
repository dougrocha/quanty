import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { NavLinks } from '../data/navLinks'
import { useGetUserQuery } from '../graphql/generated/schema'
import { StaticLinks } from '../utils/constants/API'
import { currentUserAtom } from '../utils/store/currentUser'

const HamburgerMenuIcon = dynamic(import('./HamburgerMenuIcon'))

const UserProfile = dynamic(import('./UserProfile'), { ssr: false })

const Navbar = () => {
  const router = useRouter()

  const [user, setUser] = useAtom(currentUserAtom)
  const [open, setOpen] = useState(false)

  const handleLogin = () => {
    router.replace(StaticLinks.QUANTY_API + '/api/auth/login')
  }

  useGetUserQuery({
    onCompleted: ({ me }) => setUser(me),
    fetchPolicy: 'cache-and-network',
  })

  return (
    <header className="relative">
      <nav className="mx-auto w-full max-w-7xl items-center justify-between px-6 text-sm">
        <div className="flex h-20 items-center justify-between">
          <ul className="hidden space-x-5 md:flex">
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
          <div className="ml-auto mr-5 lg:ml-0">
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

          <HamburgerMenuIcon open={open} setOpen={setOpen} />
        </div>
        {open && (
          <div className="absolute z-40 w-full bg-primary-purple-10 py-5 text-primary-white shadow-xl">
            <ul className="ml-5 flex flex-col space-y-5">
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
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
