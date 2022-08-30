import dynamic from 'next/dist/shared/lib/dynamic'
import { ReactElement } from 'react'

import DashboardContent from '../../../components/dashboard/dashboardContent'
import DashboardLayout from '../../../layouts/Dashboard'

const PrefixForm = dynamic(() => import('../../../components/forms/prefixForm'))

const SettingsPage = () => {
  return (
    <DashboardContent
      title="Guild Settings"
      description="Change your settings here"
    >
      <PrefixForm placeholder="Change your prefix" />
    </DashboardContent>
  )
}

SettingsPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default SettingsPage
