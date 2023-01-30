import { useRouter } from 'next/router'

const LoginButton = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.replace(`${process.env.NEXT_PUBLIC_QUANTY_API_URL}/api/auth/login`)
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
