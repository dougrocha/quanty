import React from 'react'
import Link from 'next/link'
import { WEBAPP_URL } from '@quanty/lib'
import { Tooltip, TooltipContent, TooltipTrigger } from '@quanty/ui'

import AppLayout from '~/layouts/AppLayout'
import { NextPageWithLayout } from '~/lib/types'

const Commands: NextPageWithLayout = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-16 px-2 sm:px-4 lg:px-6">
      <div className="my-6 space-y-2 text-center">
        <h1 className="text-5xl font-bold">Commands</h1>
        <p className="text-lg">
          Completely customizable to your exact preferences. Available now for
          free.
        </p>
      </div>
      <div className="mb-2 flex w-full justify-end px-6">
        <Link
          href={WEBAPP_URL + '/dashboard'}
          className="text-brand-50 text-sm font-bold tracking-wider underline"
        >
          GET STARTED TODAY - FOR FREE
        </Link>
      </div>

      <div className="mx-auto w-full space-y-1 rounded-md bg-dark-gray-900 p-2">
        <CommandRow
          command={{
            name: 'play',
            description: 'Plays music using YouTube, Apple Music, and Spotify.',
          }}
        />
        <CommandRow
          command={{
            name: 'play',
            description: 'Plays music using YouTube, Apple Music, and Spotify.',
          }}
        />
        <CommandRow
          command={{
            name: 'play',
            description: 'Plays music using YouTube, Apple Music, and Spotify.',
          }}
        />
        <CommandRow
          command={{
            name: 'play',
          }}
        />
        <CommandRow
          command={{
            name: 'play',
            description: 'Plays music using YouTube, Apple Music, and Spotify.',
          }}
        />
        <CommandRow
          command={{
            name: 'play',
            description: 'Plays music using YouTube, Apple Music, and Spotify.',
          }}
        />
        <CommandRow
          command={{
            name: 'play',
            options: [
              {
                name: 'song',
                description: 'The song to play.',
                type: 'string',
                required: true,
              },
              {
                name: 'playNow',
                description: 'Plays the song now.',
                type: 'boolean',
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

Commands.getLayout = page => <AppLayout>{page}</AppLayout>

interface Command {
  name: string
  description?: string
  options?: {
    name: string
    description?: string
    type?: string
    required?: boolean
  }[]
}

const CommandRow = ({ command }: { command: Command }) => {
  return (
    <>
      <div className="hover:bg-base w-full rounded-lg px-4 py-2 text-left font-medium text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <div className="flex items-center gap-x-2">
          <span className="font-semibold">/{command.name}</span>

          <div className="flex gap-x-2">
            {command.options?.map(option => (
              <Tooltip key={option.name}>
                <TooltipTrigger asChild>
                  <code
                    className={`select-none rounded px-2 text-white ${
                      option.required ? 'bg-theme-base' : 'bg-theme-neutral'
                    }`}
                  >
                    {option.name}
                  </code>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col gap-y-2 rounded-md bg-theme-base p-2 text-white">
                    {option.description}
                    <span>Option: {option.type}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-brand-100 mt-1 font-light">{command.description}</p>
      </div>
    </>
  )
}

export default Commands
