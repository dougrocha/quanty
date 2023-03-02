import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { WEBAPP_URL } from '@quanty/lib'

import AppLayout from '~/layouts/AppLayout'
import { NextPageWithLayout } from '~/lib/types'

/// TODO: Properly design this page.
const LoginPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <button
        className="rounded bg-theme-primary px-2 py-1"
        onClick={() => {
          signIn('discord', {
            callbackUrl: `${WEBAPP_URL}${router.query.redirect}`,
          })
        }}
      >
        Sign In
      </button>
    </div>
  )
}

LoginPage.getLayout = page => <AppLayout>{page}</AppLayout>

export default LoginPage
