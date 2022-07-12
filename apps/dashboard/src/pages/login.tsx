import Link from 'next/link'

const Login = () => {
  if (typeof window !== 'undefined') {
    window.location.assign(`http://localhost:3001/api/auth/login`)
  }

  return (
    <div className="text-white">
      <Link href="http://localhost:3001/api/auth/login">
        <a>Login to your dashboard</a>
      </Link>
    </div>
  )
}

export default Login
