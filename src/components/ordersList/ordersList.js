import React from 'react'
import Spinner from '../spiner/spinner'
import List from 'antd/es/list'
import Order from '../order/order'
import { Typography } from 'antd'

const { Title } = Typography

export default function OrdersList({ loading, filterBy, orders, companyId }) {
  return (
    <List
      style={{ minHeight: '100vh' }}
      className="company_orders_list_wrapper">
      {loading ? (
        <Spinner />
      ) : filterBy ? (
        orders.length > 0 ? (
          orders
            .filter(el => el.state === filterBy)
            .map(el => {
              return <Order companyId={companyId} el={el} key={el.id} />
            })
        ) : (
          <Title style={{ textAlign: 'center' }}>There are no order</Title>
        )
      ) : orders.length > 0 ? (
        orders.map(el => {
          return <Order companyId={companyId} el={el} key={el.id} />
        })
      ) : (
        <Title style={{ textAlign: 'center' }}>There are no order</Title>
      )}
    </List>
  )
}
