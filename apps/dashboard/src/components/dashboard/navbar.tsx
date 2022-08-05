import { MenuAlt2Icon } from '@heroicons/react/outline'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { dashboardDrawerToggleAtom } from '../../utils/atoms/dashboardSidebarStatus'
import { QuantumIcon } from '../icons/quantumIcon'
import UserProfile from '../userProfile'

const DashboardNavbar = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  const toggleDrawer = useSetAtom(dashboardDrawerToggleAtom)

  // Make Join Premium button dynamic
  return (
    <div className="grid h-16 w-full grid-flow-row-dense grid-cols-3 bg-primary-darkPurpleBg px-8 lg:flex lg:items-center lg:justify-between">
      <button className="mr-auto h-min w-min place-self-center lg:hidden">
        <MenuAlt2Icon
          className="h-6 w-6 text-secondary-white"
          onClick={() => toggleDrawer()}
        />
      </button>

      <div className="place-self-center font-poppins font-medium uppercase lg:hidden">
        Quanty
      </div>

      <button
        className="hidden w-40 items-center justify-evenly rounded-md bg-primary-pale-purple px-3 py-1 text-sm text-primary-yellow lg:flex"
        onClick={() => router.push('/premium')}
      >
        <p>Join Premium</p>

        <QuantumIcon />
      </button>
      <div className="flex items-center justify-end">
        <UserProfile small />
      </div>
    </div>
  )
}

export default DashboardNavbar
