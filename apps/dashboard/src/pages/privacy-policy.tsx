import React, { ReactElement } from 'react'

import PolicyLayout from '../layouts/PolicyLayout'

const PrivacyPolicyPage = () => {
  return <div>PrivacyPolicyPage</div>
}

PrivacyPolicyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="Privacy Policy for Quanty Discord Bot."
    >
      {page}
    </PolicyLayout>
  )
}

export default PrivacyPolicyPage
