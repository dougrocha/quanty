import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Guild,
  useUpdateGuildByIdMutation,
} from '../../../graphql/generated/schema'
import { useCurrentGuildConfig } from '../../../hooks'
import { PluginToggle } from '../../forms'
import GlobalSavePopup from '../global-save-popup'

const OverviewPluginsPage = () => {
  const { guild } = useCurrentGuildConfig()

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
  }, [guild])

  const [fakeLoading, setFakeLoading] = useState(false)

  const fakeUpdate = () => {
    return new Promise((resolve, reject) => {
      setFakeLoading(true)
      setTimeout(() => {
        setFakeLoading(false)
        resolve({ success: true })
      }),
        2000
    })
  }

  const [updateGuild, { data, loading, error }] = useUpdateGuildByIdMutation()

  const saveConfig = () => {
    handleSubmit(data => {
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
    toast.dismiss('dashboard-global-save')

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
  }, [isDirty])

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
