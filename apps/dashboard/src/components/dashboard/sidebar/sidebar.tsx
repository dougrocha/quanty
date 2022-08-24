import { MenuAlt2Icon } from '@heroicons/react/outline'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/image'
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

const GuildSelectionMenu = dynamic(() => import('../guildSelectionMenu'), {
  ssr: false,
})

const DashboardSidebar = () => {
  const {
    query: { guildId },
    push,
  } = useRouter()

  const [open, toggleOpen] = useAtom(sidebarOpenAtom)
  const [shrink, toggleShrink] = useAtom(sidebarCollapsedAtom)

  const isLarge = useMedia('(min-width: 1024px)', true)

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
      className={`absolute z-50 min-h-full w-full shrink-0 overflow-y-auto border-r border-primary-pale-purple bg-primary-darkPurpleBg p-5 pt-5 transition-all hover:will-change-scroll lg:static ${
        shrink ? 'lg:w-24' : 'sm:w-72'
      } ${!open && '-translate-x-full lg:-translate-x-0'}`}
    >
      <div className="flex w-full flex-col">
        <div className="relative flex h-14 w-full items-center justify-center">
          <MenuAlt2Icon
            className={`h-7 w-7 cursor-pointer text-secondary-white transition-colors hover:text-primary-white ${
              !shrink ? 'hidden' : ''
            }`}
            onClick={() => handleSidebar()}
          />

          <div
            className={`flex origin-left items-center duration-200 ${
              shrink && 'hidden'
            }`}
          >
            <ChevronDoubleLeftIcon
              className={`h-7 w-7 cursor-pointer text-secondary-white transition-colors hover:text-primary-white ${
                !shrink && 'absolute left-0'
              }`}
              onClick={() => handleSidebar()}
            />
            <div
              className="img-glow flex cursor-pointer select-none"
              onClick={() => push(`/dashboard/${guildId}/`)}
            >
              <Image
                className="rounded-full"
                alt={`Quanty bot icon`}
                src="/quanty-128.jpg"
                width={56}
                height={56}
                priority
              />
            </div>
          </div>
        </div>
        <hr className="my-5 rounded border-primary-pale-purple" />
        <GuildSelectionMenu />

        <ul className="space-y-2 text-sm">
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
          <>
            <SidebarDrawers
              key={`category-${title ?? 'default'}`}
              title={title}
              items={items}
            />
          </>
        ))}
      </div>
    </div>
  )
}

export default DashboardSidebar
