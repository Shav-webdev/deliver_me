import React from 'react'
import { Table } from 'antd'

export default function DataTable(props) {
  return <Table columns={props.columns} dataSource={props.data} />
}
