import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary-darkPurpleBg text-primary-white">
      <h1 className="mb-5 text-9xl ">404</h1>

      <p className="text-2xl text-secondary-white">
        Sorry, the page you were trying to access must not exist.
      </p>
      <Link href="/">
        <a className=" mt-5 rounded-md bg-primary-bright-purple px-5 py-2 text-xl  transition-transform hover:scale-110 ">
          Go Home
        </a>
      </Link>
    </div>
  )
}

export default Custom404
