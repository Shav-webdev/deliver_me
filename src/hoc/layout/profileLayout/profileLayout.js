import React from 'react'
import { Layout } from 'antd'

export default function ProfileLayout(props) {
  return <Layout style={{ minHeight: '100vh' }}>{props.children}</Layout>
}
