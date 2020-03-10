import React from 'react'
import { Layout } from 'antd'
import '../layouts.css'
const { Content } = Layout

export default function adminDashboardLayout(props) {
  return (
    <div>
      <Layout style={{ background: 'none' }}>
        <Content>{props.children}</Content>
      </Layout>
    </div>
  )
}
