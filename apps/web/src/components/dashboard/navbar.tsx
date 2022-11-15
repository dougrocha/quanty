import { Bars2Icon } from '@heroicons/react/24/outline'
import { useSetAtom } from 'jotai'
import Link from 'next/link'

import { sidebarOpenAtom } from '../../utils/atoms/dashboardSidebarStatus'
import { QuantumIcon } from '../icons/quantumIcon'
import UserProfile from '../userProfile'

const DashboardNavbar = () => {
  const setSidebarOpen = useSetAtom(sidebarOpenAtom)

  // Make Join Premium button dynamic
  return (
    <div className="grid h-16 w-full grid-flow-row-dense grid-cols-3 bg-primary-darkPurpleBg px-8 lg:flex lg:items-center lg:justify-between">
      <button className="mr-auto h-min w-min origin-left place-self-center lg:hidden">
        <Bars2Icon
          className="h-6 w-6 text-secondary-white"
          onClick={() => setSidebarOpen(true)}
        />
      </button>

      <div className="origin-top place-self-center font-poppins font-medium uppercase lg:hidden">
        Quanty
      </div>

      <Link href={'/premium'} passHref legacyBehavior>
        <button className="hidden w-40 items-center justify-evenly rounded-md bg-primary-pale-purple px-3 py-1 text-sm text-primary-yellow lg:flex">
          <p>Join Premium</p>

          <QuantumIcon />
        </button>
      </Link>
      <div className="flex items-center justify-end">
        <UserProfile small />
      </div>
    </div>
  )
}

export default DashboardNavbar

