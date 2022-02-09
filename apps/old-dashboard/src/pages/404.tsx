import styled from 'styled-components'

import Layout from '../layouts/Layout'

const Test = styled.div``

export default function Custom404() {
  return (
    <Layout footer={false}>
      <Test>404 - Page Not Found</Test>
    </Layout>
  )
}
