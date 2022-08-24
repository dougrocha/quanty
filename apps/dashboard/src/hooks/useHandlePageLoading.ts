import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const useHandlePageLoading = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
  }, [router.isReady])

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true)
    }
    const handleComplete = () => {
      setPageLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  })

  return { pageLoading }
}
