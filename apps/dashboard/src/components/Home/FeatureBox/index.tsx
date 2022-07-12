import React from 'react'

import FeatureCard from './FeatureCard'

const FeatureBox = () => {
  return (
    <section className="mx-auto mb-44 flex max-w-7xl flex-col items-center md:mb-80">
      <h3 className="mb-3 text-4xl font-semibold">Features</h3>
      <p className="text-sm font-semibold text-secondary-white">
        QUANTY CAN DO ALMOST EVERYTHING
      </p>
      <div className="mt-20 flex flex-col space-y-7 md:flex-row md:space-y-0  md:space-x-10">
        <FeatureCard title="Dashboard" text={holderText} />
        <FeatureCard title="Community" text={holderText} />
        <FeatureCard title="& Much More" text={holderText} />
      </div>
    </section>
  )
}

const holderText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae risus, risus dui interdum urna scelerisque lorem euismod. Nulla porttitor nunc magna turpis. '

export default FeatureBox
