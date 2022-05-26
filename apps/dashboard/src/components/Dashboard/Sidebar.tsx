import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { SidebarDrawers } from '.'

import { sidebarContents } from '../../data/dashboardSidebarItems'
import { currentGuildAtom } from '../../utils/store'

const GuildSelectionMenu = dynamic(() => import('./GuildSelectionMenu'), {
  ssr: false,
})

const DashboardSidebar = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const currGuild = useAtomValue(currentGuildAtom)

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  const handleSidebar = () => {
    setOpen(!open)
  }

  return (
    <div className="ml-40 flex h-screen w-96 flex-col border-r border-primary-pale-purple bg-primary-darkPurpleBg pt-10">
      <div className="grid grid-cols-3 items-center justify-center gap-x-1">
        <ChevronDoubleLeftIcon
          className="mr-auto ml-10 h-7 w-7 cursor-pointer text-secondary-white transition-colors hover:text-primary-white"
          onClick={handleSidebar}
        />
        <div
          className="img-glow relative mx-auto h-14 w-14 cursor-pointer"
          onClick={() => router.push(`/dashboard/${currGuild?.id}/`)}
        >
          <Image
            className="rounded-full"
            alt={`Quanty bot icon`}
            src="/quanty_128.jpg"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      <hr className="m-5 rounded border-primary-pale-purple" />

      <GuildSelectionMenu />

      {sidebarContents.map(({ title, items }) => (
        <SidebarDrawers key={`Drawer-${title}`} title={title} items={items} />
      ))}
    </div>
  )
}

export default DashboardSidebar
