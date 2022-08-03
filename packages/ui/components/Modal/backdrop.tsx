import { motion } from 'framer-motion'

interface IBackdrop {
  children: React.ReactNode
  closeModal: () => void
}

const Backdrop = ({ children, closeModal }: IBackdrop) => {
  return (
    <motion.div
      className="bg-onyx-900/60 fixed top-0 left-0 float-left flex h-screen w-screen items-center justify-center"
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop
