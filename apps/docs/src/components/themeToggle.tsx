import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeToggleButtton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="rounded-md bg-gray-200 p-2 dark:bg-primary-purple-20"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      {theme === 'light' ? (
        <SunIcon className="h-7 w-7" />
      ) : (
        <MoonIcon className="h-7 w-7" />
      )}
    </button>
  )
}

export default ThemeToggleButtton
