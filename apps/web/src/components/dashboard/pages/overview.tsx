import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useUpdateGuildByIdMutation } from '../../../graphql/generated/schema'
import { useCurrentGuildConfig } from '../../../hooks'

const PluginToggle = dynamic(() => import('../../forms/pluginToggle'))
const GlobalSavePopup = dynamic(() => import('../global-save-popup'))

const OverviewPluginsPage = () => {
  const { guildId, guild } = useCurrentGuildConfig()

  const methods = useForm({
    defaultValues: {
      anime: guild?.guildPlugins?.anime,
      autoMod: guild?.guildPlugins?.autoMod,
    },
  })

  const {
    reset,
    formState: { isDirty, isSubmitSuccessful, isSubmitting },
    handleSubmit,
  } = methods

  useEffect(() => {
    reset({
      anime: guild?.guildPlugins?.anime,
      autoMod: guild?.guildPlugins?.autoMod,
    })
  }, [guildId])

  const [updateGuild, { loading, error }] = useUpdateGuildByIdMutation()

  const saveConfig = () => {
    return handleSubmit(data => {
      updateGuild({
        variables: {
          guildId: guild?.id ?? '',
          guildUpdateInput: {
            guildPlugins: {
              update: {
                anime: {
                  set: data.anime,
                },
                autoMod: {
                  set: data.autoMod,
                },
              },
            },
          },
        },
      })
    })()
  }

  useEffect(() => {
    if (isDirty)
      toast.custom(
        t => (
          <GlobalSavePopup
            t={t}
            loading={isSubmitting || loading}
            error={error}
            successful={isSubmitSuccessful}
            handleSubmit={saveConfig}
            reset={reset}
            isDirty={isDirty}
          />
        ),
        {
          duration: Infinity,
          position: 'bottom-center',
          id: 'dashboard-global-save',
        },
      )

    if (isSubmitSuccessful && !loading && !error && !isSubmitting) {
      reset({
        anime: guild?.guildPlugins?.anime,
        autoMod: guild?.guildPlugins?.autoMod,
      })
      setTimeout(() => toast.dismiss('dashboard-global-save'), 1000)
    }

    // TODO: Handle error here somehow
    if (error) reset()

    return () => {
      toast.dismiss('dashboard-global-save')
    }
  }, [guild, isDirty, loading, error, isSubmitSuccessful, isSubmitting, reset])

  return (
    <FormProvider {...methods}>
      <form>
        <PluginToggle name="anime" />

        <PluginToggle name="autoMod" />
      </form>
    </FormProvider>
  )
}

export default OverviewPluginsPage
