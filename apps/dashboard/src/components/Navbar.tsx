import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import { NavLinksData } from '../data/navLinks'
import { useToggle } from '../hooks/useToggle'

const HamburgerMenuIcon = dynamic(import('./HamburgerMenuIcon'))

const UserProfile = dynamic(import('./UserProfile'), { ssr: false })

const Navbar = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <nav className="relative mx-auto max-w-7xl px-6 text-sm">
        <div className="flex h-20 items-center justify-between">
          <ul className=" hidden space-x-5 md:flex">
            <NavLinks />
          </ul>
          <div className=" ml-auto mr-5 lg:ml-0">
            <UserProfile />
          </div>

          <HamburgerMenuIcon open={open} setOpen={toggleOpen} />
        </div>
      </nav>
      {open && (
        <div className="absolute z-40 w-full bg-primary-purple-10 py-5 text-primary-white shadow-xl">
          <ul className=" flex flex-col items-center space-y-10">
            <NavLinks />
          </ul>
        </div>
      )}
    </>
  )
}

const NavLinks = () => {
  return (
    <>
      {NavLinksData.map((link, index) => {
        return (
          <li key={index}>
            <Link href={link.path}>
              <a>{link.name}</a>
            </Link>
          </li>
        )
      })}
    </>
  )
}

export default Navbar
