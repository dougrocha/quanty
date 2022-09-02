import { MenuAlt2Icon } from '@heroicons/react/outline'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { useAtom, useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMedia } from 'react-use'

import DrawerItem from './drawerItem'

import { SidebarDrawers } from '..'
import {
  DefaultCategory,
  sidebarContents,
} from '../../../data/dashboardSidebarItems'
import {
  sidebarOpenAtom,
  sidebarCollapsedAtom,
} from '../../../utils/atoms/dashboardSidebarStatus'
import { currentGuildIdAtom } from '../../../utils/atoms/guild'

const GuildSelectionMenu = dynamic(() => import('../guildSelectionMenu'))

const DashboardSidebar = () => {
  const { push } = useRouter()

  const [open, toggleOpen] = useAtom(sidebarOpenAtom)
  const [shrink, toggleShrink] = useAtom(sidebarCollapsedAtom)

  const isLarge = useMedia('(min-width: 1024px)', true)

  const guildId = useAtomValue(currentGuildIdAtom)

  useEffect(() => {
    if (!isLarge) {
      toggleOpen(false)
      toggleShrink(false)
    }
  }, [isLarge])

  const handleSidebar = () => {
    if (isLarge) toggleShrink(prev => !prev)
    else toggleOpen(prev => !prev)
  }

  return (
    <div
      className={`absolute z-50 min-h-full w-full shrink-0 overflow-y-auto overflow-x-hidden border-r border-primary-pale-purple bg-primary-darkPurpleBg p-5 pt-5 transition-all hover:will-change-scroll lg:static ${
        shrink ? 'lg:w-24' : 'sm:w-72'
      } ${!open ? '-translate-x-full lg:-translate-x-0' : ''}`}
    >
      <div className="flex w-full flex-col">
        <div className="relative mb-5 flex w-full items-center justify-center">
          <MenuAlt2Icon
            className={`h-7 w-7 cursor-pointer text-secondary-white transition-colors hover:text-primary-white ${
              !shrink ? 'hidden' : ''
            }`}
            onClick={() => handleSidebar()}
          />

          <div
            className={`flex origin-left items-center duration-200 ${
              shrink ? 'hidden' : ''
            }`}
          >
            <ChevronDoubleLeftIcon
              className={`h-7 w-7 cursor-pointer text-secondary-white transition-colors hover:text-primary-white ${
                !shrink ? 'absolute left-0' : ''
              }`}
              onClick={() => handleSidebar()}
            />

            <Image
              className="img-glow flex cursor-pointer select-none rounded-full"
              src="/quanty-128.jpg"
              alt={`Quanty bot icon`}
              width={56}
              height={56}
              priority
              onClick={() => push(`/dashboard/${guildId}`)}
            />
          </div>
        </div>

        <hr
          className={` rounded border-primary-pale-purple ${
            shrink ? '' : 'mb-3'
          }`}
        />

        <GuildSelectionMenu />

        <ul className="mt-3 space-y-2 text-sm">
          {DefaultCategory.map(({ name, link, icon, premium }) => (
            <li key={`Drawer-Item-${name}`}>
              <DrawerItem
                name={name}
                link={link}
                icon={icon}
                premium={premium}
                guildId={guildId as string}
                minimized={shrink}
              />
            </li>
          ))}
        </ul>

        {sidebarContents.map(({ title, items }) => (
          <SidebarDrawers
            key={`category-${title}`}
            title={title}
            items={items}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardSidebar
