import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useUpdateGuildByIdMutation } from '../../graphql/generated/schema'
import { useCurrentGuildId } from '../../hooks/useCurrentGuildId'
import { guildConfigAtom } from '../../utils/atoms'

const prefixSchema = Joi.object({
  prefix: Joi.string().required().min(1).max(5).messages({
    'string.min': 'Prefix cannot be empty.',
    'string.max': 'Prefix cannot exceed 5 characters.',
    'string.empty': 'Prefix is required.',
  }),
})

export const PrefixForm = ({ placeholder }: { placeholder?: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(prefixSchema),
    mode: 'onChange',
  })

  const guild = useAtomValue(guildConfigAtom)

  useEffect(() => {
    setValue('prefix', guild ? guild.prefix : 'q!')
  }, [guild])

  const [updatePrefix] = useUpdateGuildByIdMutation()

  const guildId = useCurrentGuildId()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: { prefix?: string }, e: any) => {
    console.log(e)
    toast.promise(
      updatePrefix({
        variables: {
          guildId: guildId as string,
          guildUpdateInput: {
            prefix: { set: data.prefix },
          },
        },
      }),
      {
        loading: 'Updating...',
        error: <b>Could not update prefix.</b>,
        success: <b>Updated prefix.</b>,
      },
      {
        id: 'prefix-update-notification',
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="prefix"
          className="block text-sm font-medium text-primary-white"
        >
          Prefix:
        </label>
        <div className="flex items-center">
          <input
            id="prefix"
            type={'text'}
            autoComplete={'off'}
            className={`w-56 rounded-md border-none border-transparent bg-primary-purple-6 py-2 px-3 focus:border-transparent focus:ring-0`}
            placeholder={placeholder}
            defaultValue={guild?.prefix}
            {...register('prefix')}
          />

          {guild?.prefix != watch('prefix', guild?.prefix) && (
            <input
              type={'submit'}
              value="Save"
              className="ml-4 h-full rounded-md bg-primary-bright-purple py-2 px-3 text-sm"
            />
          )}
        </div>

        <span className="text-sm text-red-600">
          {errors.prefix?.message as unknown as string}
        </span>
      </div>
    </form>
  )
}
