import { ReactElement } from 'react'

import DashboardContent from '../../../components/dashboard/dashboardContent'
import { PrefixForm } from '../../../components/forms'
import DashboardLayout from '../../../layouts/Dashboard'

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
