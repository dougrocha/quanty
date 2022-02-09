import React from 'react'
import { PongSpinner } from 'react-spinners-kit'

const LoadingLayout = () => {
  return (
    <div className="bg-feldgray-400 dark:bg-bg-600 flex h-screen items-center justify-center">
      <PongSpinner size={6} color={'#eaeaea'} sizeUnit="rem" />
    </div>
  )
}

export default LoadingLayout
