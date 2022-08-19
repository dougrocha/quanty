import { ApolloError, MutationFunction } from '@apollo/client'
import React from 'react'
import toast, { Toast } from 'react-hot-toast'

const GlobalSavePopup = ({
  t,
  isDirty,
  loading,
  error,
  successful,
  handleSubmit,
  reset,
}: {
  t: Toast
  loading: boolean
  successful: boolean
  isDirty: boolean
  handleSubmit: () => void
  error: ApolloError | undefined
  reset: () => void
}) => {
  return (
    <div
      className={` flex h-16 w-full max-w-5xl items-center justify-between rounded bg-primary-pale-purple px-5 text-white motion-safe:transition-all ${
        t.visible ? `translate-y-0` : 'translate-y-20'
      }`}
    >
      <div>You have unsaved changes</div>
      <div className="ml-5 flex space-x-5">
        <button
          className="rounded bg-primary-purple-20 px-4 py-2"
          onClick={() => {
            if (loading) return
            reset()
            toast.dismiss(t.id)
          }}
        >
          RESET
        </button>
        <button
          className={`rounded bg-primary-bright-purple px-4 py-2 ${
            loading && 'cursor-wait'
          }`}
          onClick={() => {
            if (loading || !isDirty) return
            handleSubmit()
          }}
        >
          {loading ? 'SAVING' : 'SAVE'}
        </button>
      </div>
    </div>
  )
}

export default GlobalSavePopup
