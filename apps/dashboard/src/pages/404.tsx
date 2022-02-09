import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className="bg-bg-600 flex h-screen w-screen items-center justify-center">
      <div className="bg-bg-600-600 border-bg-500 shadow-form mx-5 flex flex-col items-center justify-center rounded-3xl border p-20 brightness-125">
        <p className="text-primary-white text-2xl">
          Sorry, you are at the wrong page.
        </p>
        <Link href="/" passHref>
          <a>
            <button className="text-primary-white bg-secondary-red border-bg-light mt-5 rounded-md border px-3 py-1 text-xl">
              Go Home
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Custom404
