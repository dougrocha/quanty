import { MenuAlt2Icon } from '@heroicons/react/outline'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useMedia } from 'react-use'

import { SidebarDrawers } from '.'

import { DrawerItem } from './sidebarDrawer'

import {
  DefaultCategory,
  sidebarContents,
} from '../../data/dashboardSidebarItems'
import {
  dashboardDrawerShinkToggleAtom,
  dashboardDrawerToggleAtom,
} from '../../utils/atoms/dashboardSidebarStatus'

const GuildSelectionMenu = dynamic(() => import('./guildSelectionMenu'), {
  ssr: false,
})

const DashboardSidebar = () => {
  const {
    query: { guildId },
    push,
  } = useRouter()

  const [open, setToggle] = useAtom(dashboardDrawerToggleAtom)
  const [shrink, setShrink] = useAtom(dashboardDrawerShinkToggleAtom)

  const isLarge = useMedia('(min-width: 1024px)', true)

  useEffect(() => {
    if (!isLarge) {
      setToggle(false)
      setShrink(false)
    }
  }, [isLarge])

  const sidebarRef = useRef(null)

  const handleSidebar = () => {
    if (isLarge) setShrink()
    else setToggle()
  }

  return (
    <div
      ref={sidebarRef}
      className={`absolute z-50 flex h-screen w-full flex-shrink-0 transform flex-col overflow-x-hidden border-r border-primary-pale-purple bg-primary-darkPurpleBg p-5 pt-10 transition-all duration-100 hover:will-change-scroll lg:static 2xl:ml-40 ${
        shrink ? 'lg:w-24' : 'sm:w-72'
      } ${open ? '' : '-translate-x-full lg:-translate-x-0'}`}
    >
      <div className="relative flex h-14 items-center justify-center">
        <MenuAlt2Icon
          className={`h-7 w-7 cursor-pointer text-secondary-white transition-colors hover:text-primary-white ${
            !shrink ? 'hidden' : ''
          }`}
          onClick={() => handleSidebar()}
        />

        {!shrink && (
          <>
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
          </>
        )}
      </div>
      <hr className="my-5 rounded border-primary-pale-purple" />
      <GuildSelectionMenu />

      <ul className="space-y-2">
        {DefaultCategory.map(({ name, link, icon, premium }) => (
          <DrawerItem
            key={`Drawer-Item-${name}`}
            name={name}
            link={link}
            icon={icon}
            premium={premium}
            guildId={guildId as string}
            minimized={shrink}
          />
        ))}
      </ul>

      {sidebarContents.map(({ title, items }) => (
        <SidebarDrawers
          key={`category-${title ?? 'default'}`}
          title={title}
          items={items}
        />
      ))}
    </div>
  )
}

export default DashboardSidebar
