import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Footer from '~/components/footer'
import Navbar from '~/components/main-navbar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      void signIn('discord') // Force sign in to hopefully resolve error
    }
  }, [session?.error])

  return (
    <div className="min-safe-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default AppLayout
