import React from 'react'
import { Layout } from 'antd'
const { Content } = Layout

export default function NotFoundLayout(props) {
  return (
    <Layout>
      <Content>{props.children}</Content>
    </Layout>
  )
}
