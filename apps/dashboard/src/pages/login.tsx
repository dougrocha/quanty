import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    router.push(`${process.env.NEXT_PUBLIC_QUANTY_API_URL}/api/auth/login`)
  }

  return (
    <div className="text-white">
      <Link href={`${process.env.NEXT_PUBLIC_QUANTY_API_URL}/api/auth/login`}>
        <a>Login to your dashboard</a>
      </Link>
    </div>
  )
}

export default Login
