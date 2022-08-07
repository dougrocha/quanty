import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import {
  useGuildConfigSubscription,
  useUpdateGuildByIdMutation,
} from '../../graphql/generated/schema'
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
  const guild = useAtomValue(guildConfigAtom)

  useEffect(() => {
    setValue('prefix', guild ? guild.prefix : 'q!')
  }, [guild])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(prefixSchema),
  })

  const [updatePrefix] = useUpdateGuildByIdMutation()

  const guildId = useCurrentGuildId()

  const onSubmit = (data: { prefix?: string }) => {
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

  const isDifferent = guild?.prefix != watch('prefix', guild?.prefix)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="prefix"
          className="block text-sm font-medium text-primary-white"
        >
          Prefix:
        </label>
        <div>
          <input
            className="w-56 rounded-md px-2 py-1"
            placeholder={placeholder}
            defaultValue={guild?.prefix}
            {...register('prefix')}
          />

          {isDifferent && <input type="submit" />}
        </div>

        <span className="text-red-600">
          ERROR SPAN
          {errors.prefix?.message as unknown as string}
        </span>
      </div>
    </form>
  )
}
