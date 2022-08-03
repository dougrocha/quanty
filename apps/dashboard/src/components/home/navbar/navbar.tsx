import dynamic from 'next/dynamic'
import Link from 'next/link'
import React from 'react'

import { NavLinksData } from '../../../data/navLinks'
import { useToggle } from '../../../hooks/useToggle'

const HamburgerMenuIcon = dynamic(import('../../icons/hamburgerMenuIcon'))

const UserProfile = dynamic(import('../../userProfile'), { ssr: false })

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
        <div className="absolute z-40 w-full bg-primary-purple-10 text-primary-white shadow-xl">
          <ul className="flex h-full flex-col items-center">
            <NavLinks toggleOpen={toggleOpen} open={open} />
          </ul>
        </div>
      )}
    </>
  )
}

const NavLinks = ({
  toggleOpen,
  open,
}: {
  toggleOpen?: () => void
  open?: boolean
}) => {
  return (
    <>
      {NavLinksData.map((link, index) => {
        return (
          <li
            key={index}
            className={`w-full cursor-pointer py-4 text-center ${
              open ? 'hover:bg-primary-pale-purple' : ''
            }`}
            onClick={() => {
              if (toggleOpen) toggleOpen()
            }}
          >
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
