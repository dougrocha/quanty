import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'

import DrawerItem from './drawerItem'

import { ISidebarContents } from '../../../data/dashboardSidebarItems'
import { sidebarCollapsedAtom } from '../../../utils/atoms/dashboardSidebarStatus'
import { currentGuildIdAtom } from '../../../utils/atoms/guild'

type ISidebarDrawer = ISidebarContents

const SidebarDrawers = ({ title, items }: ISidebarDrawer) => {
  const guildId = useAtomValue(currentGuildIdAtom)

  const sidebarShrinked = useAtomValue(sidebarCollapsedAtom)

  const [dropdownOpen, setDropdownOpen] = useState(true)

  return (
    <div className="cursor-pointer">
      {title && (
        <div
          className={`mt-3 flex select-none items-center justify-center transition-all duration-75 ${
            sidebarShrinked ? 'hidden opacity-0' : 'opacity-100'
          }`}
          onClick={() => setDropdownOpen(prev => !prev)}
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

      <ul
        className={`space-y-2 ${
          !dropdownOpen && !sidebarShrinked ? 'hidden' : ''
        }`}
      >
        {items.map(({ name, link, icon, premium }) => (
          <DrawerItem
            key={`Drawer-Item-${name}`}
            name={name}
            link={link}
            icon={icon}
            premium={premium}
            guildId={guildId}
            minimized={sidebarShrinked}
          />
        ))}
      </ul>
    </div>
  )
}

export default SidebarDrawers
