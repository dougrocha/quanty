import { useRouter } from 'next/router'
import { useEffect } from 'react'

import UserProfile from '../UserProfile'
import { QuantumIcon } from '../icons/QuantumIcon'

const DashboardNavbar = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  return (
    <div className="flex h-16 w-full items-center justify-between bg-primary-darkPurpleBg px-8">
      <button
        suppressHydrationWarning
        className="flex w-40 items-center justify-evenly rounded-md bg-primary-pale-purple px-3 py-1 text-sm text-primary-yellow"
        onClick={() => router.push('/premium')}
      >
        <p>Join Premium</p>
        <QuantumIcon />
      </button>
      <UserProfile small />
    </div>
  )
}

export default DashboardNavbar
