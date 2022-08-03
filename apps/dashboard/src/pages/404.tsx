import Link from 'next/link'

import Navbar from '../components/home/navbar/navbar'

const Custom404 = () => {
  return (
    <div className="block h-screen overflow-auto bg-primary-darkPurpleBg text-primary-white antialiased">
      <div className="mx-auto max-w-6xl px-4 text-primary-white sm:px-6 xl:px-0">
        <Navbar />
        <div className="mt-10 flex flex-col  items-center">
          <h1 className="mb-5 text-9xl ">404</h1>

          <p className="text-2xl text-secondary-white">
            Sorry, the page you were trying to access may be lost forever.
          </p>
          <Link href="/">
            <a className="mt-5 w-fit rounded-2xl bg-primary-bright-purple px-4 py-2 text-lg transition-transform hover:scale-105 ">
              Go Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Custom404
