import { ReactElement } from 'react'

import DashboardLayout from '../../../layouts/Dashboard'

const SettingsPage = () => {
  return <div className="bg-red-500">SETTINGS</div>
}

SettingsPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default SettingsPage
