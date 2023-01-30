/* eslint-disable no-unused-vars */
import { useState } from 'react'

export const useModal = (
  initialValue: boolean,
): [boolean, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue)

  const openModal = () => {
    setValue(true)
  }

  const closeModal = () => {
    setValue(false)
  }

  return [value, openModal, closeModal]
}
