import Link from 'next/link'
import { ReactElement } from 'react'

import { BaseLayout } from '../layouts'

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-5 text-9xl">404</h1>

      <p className=" text-2xl text-secondary-white">
        Sorry, the page you were trying to access may be lost forever.
      </p>
      <Link
        href="/"
        className="mt-5 w-fit rounded-2xl bg-primary-bright-purple px-4 py-2 text-lg transition-transform hover:scale-105 ">
        
          Go Home
        
      </Link>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>
}

export default Custom404
