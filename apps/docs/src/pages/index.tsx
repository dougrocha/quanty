import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  return (
    <div className="m-auto flex h-full w-full">
      <div className="bg-red-500 text-lg italic">HOME PAGE</div>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-lg text-white transition-all hover:bg-red-500"
        onClick={() => {
          router.push('/docs')
        }}
      >
        CLICK HERE
      </button>
    </div>
  )
}

export default Home
