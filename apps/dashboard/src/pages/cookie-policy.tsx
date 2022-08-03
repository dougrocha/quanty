import React, { ReactElement } from 'react'

import PolicyLayout from '../layouts/PolicyLayout'

const CookiePolicyPage = () => {
  return <div>CookiePolicyPage</div>
}

CookiePolicyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PolicyLayout
      title="Cookie Policy"
      description="Cookie Policy for Quanty Discord Bot."
    >
      {page}
    </PolicyLayout>
  )
}

export default CookiePolicyPage
