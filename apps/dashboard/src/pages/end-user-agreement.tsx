import React, { ReactElement } from 'react'

import PolicyLayout from '../layouts/PolicyLayout'

const EndUserAgreementPage = () => {
  return <div>EndUserAgreementPage</div>
}

EndUserAgreementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PolicyLayout
      title="End User Agreement"
      description="End User Agreement for Quanty Discord Bot."
    >
      {page}
    </PolicyLayout>
  )
}

export default EndUserAgreementPage
