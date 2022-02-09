/* eslint-disable no-unused-vars */
import { useState } from 'react'

const useInput = (initialValue: boolean): [boolean, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const openModal = () => {
    setValue(true)
  }

  const closeModal = () => {
    setValue(false)
  }

  return [value, openModal, closeModal]
}

export default useInput
