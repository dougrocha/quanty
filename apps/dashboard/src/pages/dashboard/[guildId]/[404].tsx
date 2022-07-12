import { ReactElement } from 'react'

import DashboardContent from '../../../components/Dashboard/DashboardContent'
import DashboardLayout from '../../../layouts/Dashboard'

const Dashboard404 = () => {
  return (
    <DashboardContent>
      <div>This page does not exist.</div>
    </DashboardContent>
  )
}

Dashboard404.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Dashboard404
