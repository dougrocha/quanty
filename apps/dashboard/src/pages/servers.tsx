import React from 'react'

const Servers = (props: any) => {
  return <div>Servers {props.msg}</div>
}

export function getServerSideProps(ctx: any) {
  const authSession = ctx
  console.log(authSession)

  return {
    props: { msg: 'hello' },
  }
}

export default Servers
