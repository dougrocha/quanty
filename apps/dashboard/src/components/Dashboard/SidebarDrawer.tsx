import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import router from 'next/router'
import React, { useState } from 'react'

import {
  DefaultCategory,
  ISidebarContents,
  ISidebaritems,
} from '../../data/dashboardSidebarItems'
import { Guild } from '../../graphql/generated/schema'
import { currentGuildAtom } from '../../utils/store/currentGuild'
import { BaseIcon } from '../icons'

type ISidebarDrawer = ISidebarContents

const SidebarDrawers = ({ title, items }: ISidebarDrawer) => {
  const guild = useAtomValue(currentGuildAtom)
  const [drawerOpen, setDrawerOpen] = useState(true)

  return (
    <div
      key={`category-${title ?? 'default'}`}
      className="mb-3 cursor-pointer px-5"
    >
      {DefaultCategory.map(({ name, link, icon, premium }) => (
        <DrawerItem
          key={`Drawer-Item-${name}`}
          name={name}
          link={link}
          icon={icon}
          premium={premium}
          guild={guild}
        />
      ))}
      {title && (
        <div
          className="flex items-center justify-center"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <p className="ml-3 text-sm">{title}</p>

          <ChevronDownIcon
            className={`ml-auto mr-2 h-7 w-7 cursor-pointer text-secondary-white transition duration-300 ${
              !drawerOpen && 'rotate-180'
            }`}
          />
        </div>
      )}

      <ul className={`flex flex-col ${!drawerOpen && 'hidden'}`}>
        {items.map(({ name, link, icon, premium }) => (
          <DrawerItem
            key={`Drawer-Item-${name}`}
            name={name}
            link={link}
            icon={icon}
            premium={premium}
            guild={guild}
          />
        ))}
      </ul>
    </div>
  )
}

interface IDrawerItem extends ISidebaritems {
  guild: Guild | null
}

const DrawerItem = ({ name, link, icon, premium, guild }: IDrawerItem) => {
  return (
    <Link
      key={`item-${name}`}
      href={{
        pathname: `/dashboard/${guild?.id}/${link}`,
      }}
    >
      <a
        className={`flex cursor-pointer items-center px-3 py-2 text-sm ${
          premium && 'text-primary-yellow'
        } ${
          `/dashboard/[guildId]${link ? `/${link}` : ''}` == router.pathname
            ? 'rounded-lg bg-primary-purple-20 '
            : 'text-secondary-white'
        } `}
      >
        <BaseIcon icon={icon} width={30} />
        <p className="ml-3">{name}</p>
      </a>
    </Link>
  )
}

export default SidebarDrawers
