import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useUpdateGuildByIdMutation } from '../../graphql/generated/schema'
import { guildConfigAtom } from '../../utils/store'

const schema = Joi.object({
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
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  })
  const {
    query: { guildId },
  } = useRouter()

  const guild = useAtomValue(guildConfigAtom)

  const [updatePrefix] = useUpdateGuildByIdMutation()

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
      <label
        htmlFor="prefix"
        className="block text-sm font-medium text-secondary-white"
      >
        Prefix:
      </label>
      <div className="flex">
        <input
          key={`prefix-form-${guild?.id}`}
          type="text"
          className={` border-none bg-primary-purple-6 focus:outline-none ${
            isDifferent ? 'rounded-l-md' : 'rounded-md'
          }`}
          placeholder={placeholder}
          defaultValue={guild?.prefix}
          {...register('prefix')}
        />

        {isDifferent && (
          <input
            type="submit"
            className="rounded-r-md bg-primary-lime-green py-2 px-3 text-black"
          />
        )}
      </div>

      <span className="text-sm text-red-500">
        {errors.prefix?.message as unknown as string}
      </span>
    </form>
  )
}
