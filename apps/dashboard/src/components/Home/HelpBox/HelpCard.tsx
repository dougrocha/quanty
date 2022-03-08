import { ArrowRightIcon } from '@heroicons/react/solid'
import React from 'react'

interface IHelpCard {
  title: string
  actionText: string
}

const HelpCard = ({ title, actionText }: IHelpCard) => {
  return (
    <button className="flex w-80 flex-col justify-between rounded-lg bg-primary-purple-20 p-4 text-left">
      {title}
      <div className="flex w-full items-center space-x-2 pt-2">
        <p className=" text-secondary-white">{actionText}</p>
        <ArrowRightIcon className="h-4 w-4" />
      </div>
    </button>
  )
}

export default HelpCard
