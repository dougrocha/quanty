import React from 'react'

interface IFeatureCard {
  title: string
  text: string
}

const FeatureCard = ({ title, text }: IFeatureCard) => {
  // TODO: Maybe change the secondary white to a ligher shader kind of hard to see
  return (
    <div className="flex flex-col rounded-2xl bg-primary-purple-10 p-6">
      <p className="text-2xl font-semibold">{title}</p>
      <text className="mt-9 text-secondary-white">{text}</text>
    </div>
  )
}

export default FeatureCard
