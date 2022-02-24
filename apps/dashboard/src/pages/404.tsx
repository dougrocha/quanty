import Link from 'next/link'
import { useRouter } from 'next/router'

const Custom404 = () => {
  const router = useRouter()

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#919FF0]/10">
      <div className="mx-5 flex flex-col items-center justify-center rounded-3xl bg-[#919FF0]/10  p-20 shadow-xl ">
        <h1 className="mb-5 text-9xl text-white/90">404</h1>

        <p className="text-2xl text-white/60">
          Sorry, you are at the wrong page.
        </p>
        <Link href="/" passHref>
          <button
            type="button"
            className=" mt-5 rounded-md  bg-blue-400 px-5 py-2 text-xl text-white transition-transform hover:scale-110 "
            onClick={router.back}
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Custom404
