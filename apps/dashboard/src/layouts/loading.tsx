import React from 'react'
import { PongSpinner } from 'react-spinners-kit'

const LoadingLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary-darkPurpleBg antialiased">
      <PongSpinner size={6} color={'#eaeaea'} sizeUnit="rem" />
    </div>
  )
}

export default LoadingLayout
