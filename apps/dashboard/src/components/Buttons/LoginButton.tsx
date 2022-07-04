import { useRouter } from 'next/router'
import React from 'react'

import { StaticLinks } from '../../utils/constants/API'

const LoginButton = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.replace(StaticLinks.QUANTY_API + '/api/auth/login')
  }

  return (
    <button
      className="rounded-2xl bg-primary-bright-purple py-2 px-4"
      onClick={handleLogin}
    >
      Login
    </button>
  )
}

export default LoginButton
