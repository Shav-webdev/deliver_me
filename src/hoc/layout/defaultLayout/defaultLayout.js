import React from 'react'
import { Layout } from 'antd'
import '../layouts.css'
const { Content } = Layout

export default function defaultLayout(props) {
  return (
    <div className="layout_wrapper homepage_wrapper">
      <Layout style={{ background: 'none' }}>
        <Content>{props.children}</Content>
      </Layout>
    </div>
  )
}
