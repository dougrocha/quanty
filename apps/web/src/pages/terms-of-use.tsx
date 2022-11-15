import React, { ReactElement } from 'react'

import PolicyLayout from '../layouts/PolicyLayout'

const TermsofUsePage = () => {
  return <div>TermsOfUse</div>
}

TermsofUsePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PolicyLayout
      title="Terms of Use"
      description="Terms of Use for Quanty Discord Bot."
    >
      {page}
    </PolicyLayout>
  )
}

export default TermsofUsePage
