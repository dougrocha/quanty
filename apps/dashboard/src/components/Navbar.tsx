import { useAtomValue } from 'jotai'
import React from 'react'

import UserProfile from './UserProfile'

import { currentUserAtom } from '../pages'

const Navbar = () => {
  const handleLogin = () => {
    window.location.assign(`http://localhost:3001/api/auth/login`)
  }

  const user = useAtomValue(currentUserAtom)

  return (
    <nav className="flex h-20 items-center justify-between text-sm ">
      <ul className="flex space-x-5">
        <li>Home</li>
        <li>Plugins</li>
        <li>Support</li>
        <li>Docs</li>
      </ul>
      <div>
        {user ? (
          <UserProfile />
        ) : (
          <button
            className="rounded-lg bg-primary-bright-purple py-2 px-4"
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
