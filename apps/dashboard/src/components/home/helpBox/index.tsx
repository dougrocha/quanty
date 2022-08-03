import React from 'react'

import HelpCard from './helpCard'

const HelpBox = () => {
  // TODO: Change buttons to divs and p tags to a
  return (
    <div className=" w-full bg-primary-purple-6">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-between  px-4 py-10 text-primary-white sm:px-6 xl:px-0">
        <h5 className="text-2xl font-semibold">Need Help?</h5>
        <div className="mt-16 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-10">
          <HelpCard
            title="Set up custom welcome messages"
            actionText="Keep Reading"
          />

          <HelpCard
            title="Set up custom roles for your guild members"
            actionText="Keep Reading"
          />
        </div>
        <button
          className="mt-10 rounded-lg bg-primary-bright-purple px-3 py-1"
          onClick={() => alert('fix')}
        >
          Read More
        </button>
      </div>
    </div>
  )
}

export default HelpBox
