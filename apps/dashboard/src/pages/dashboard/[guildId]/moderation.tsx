import { ReactElement } from 'react'

import DashboardLayout from '../../../layouts/Dashboard'

const ModerationPage = () => {
  return <div className="bg-red-500">MODERATION</div>
}

ModerationPage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default ModerationPage
