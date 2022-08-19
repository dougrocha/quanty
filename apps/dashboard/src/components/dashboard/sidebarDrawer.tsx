import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import {
  ISidebarContents,
  ISidebarItems,
} from '../../data/dashboardSidebarItems'
import { sidebarCollapsedAtom } from '../../utils/atoms/dashboardSidebarStatus'
import HeroIcon from '../icons/dynamicHeroIcon'

type ISidebarDrawer = ISidebarContents

const SidebarDrawers = ({ title, items }: ISidebarDrawer) => {
  const {
    query: { guildId },
  } = useRouter()
  const sidebarShrinked = useAtomValue(sidebarCollapsedAtom)

  const [dropdownOpen, setDropdownOpen] = useState(true)

  return (
    <div className="cursor-pointer">
      {title && !sidebarShrinked && (
        <div
          className={`mt-3 flex select-none items-center justify-center transition-all delay-75 duration-75 ${
            sidebarShrinked ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <p className="overflow-x-hidden whitespace-nowrap text-sm">{title}</p>

          <ChevronDownIcon
            className={`ml-auto mr-2 h-7 w-7 cursor-pointer text-secondary-white transition duration-300  ${
              !dropdownOpen && 'rotate-180'
            }`}
          />
        </div>
      )}
      {sidebarShrinked && (
        <hr className="my-2 rounded border-primary-pale-purple" />
      )}

      <ul className={`space-y-2 ${!dropdownOpen && 'hidden'}`}>
        {items.map(({ name, link, icon, premium }) => (
          <DrawerItem
            key={`Drawer-Item-${name}`}
            name={name}
            link={link}
            icon={icon}
            premium={premium}
            guildId={guildId as string}
            minimized={sidebarShrinked}
          />
        ))}
      </ul>
    </div>
  )
}

interface IDrawerItem extends ISidebarItems {
  guildId: string | null
  minimized?: boolean
}

export const DrawerItem = ({
  name,
  link,
  icon,
  premium,
  guildId,
  minimized,
}: IDrawerItem) => {
  const router = useRouter()

  const isActive =
    `/dashboard/[guildId]${link ? `/${link}` : ''}` == router.pathname

  return (
    <Link
      key={`item-${name}`}
      href={{
        pathname: `/dashboard/${guildId}/${link}`,
      }}
    >
      <a
        className={`flex min-w-max items-center px-2 py-2 hover:text-primary-white ${
          premium && 'text-primary-yellow'
        } ${
          isActive
            ? 'rounded-md bg-primary-purple-20 text-primary-white'
            : 'text-secondary-white'
        } ${minimized && 'flex cursor-pointer justify-center'} `}
      >
        {icon && <HeroIcon name={icon} className="h-6 w-6" outline />}

        <p
          className={`ml-3 origin-left whitespace-nowrap duration-200 ${
            minimized && 'hidden'
          }`}
        >
          {name}
        </p>
      </a>
    </Link>
  )
}

export default SidebarDrawers
