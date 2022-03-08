import React from 'react'

const Hero = () => {
  // TODO: Find way to implement background
  return (
    <div className="relative mb-36 mt-28 flex h-96 flex-col items-center justify-center xl:mb-64 xl:mt-48">
      <h1 className="text-center text-4xl font-bold">Quantum Realm Platform</h1>
      <p className="text-md mt-1 text-center text-secondary-white">
        Serving quality of life discord features with Quanty.
      </p>
      <div className="mt-11 flex flex-col space-y-5">
        <button className="rounded-3xl bg-primary-bright-purple px-12 py-2 ">
          Invite Quanty
        </button>
        <button className="rounded-3xl bg-primary-purple-10 px-12 py-2">
          Support Server
        </button>
        <button className="rounded-3xl bg-primary-purple-10 px-12 py-2">
          Dashboard (WIP)
        </button>
      </div>
    </div>
  )
}

export default Hero
