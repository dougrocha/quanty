import { RotateSpinner } from 'react-spinners-kit'

const LoadingLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-primary-darkPurpleBg antialiased">
      <RotateSpinner size={4} color={'#6635F0'} sizeUnit="rem" />
    </div>
  )
}

export default LoadingLayout
