import React from 'react'
import Spinner from '../spiner/spinner'
import List from 'antd/es/list'
import Order from '../order/order'

export default function OrdersList({ loading, filterBy, orders }) {
  return (
    <List
      style={{ minHeight: '100vh' }}
      className="company_orders_list_wrapper">
      {loading ? (
        <Spinner />
      ) : filterBy ? (
        orders
          .filter(el => el.state === filterBy)
          .map(el => {
            return <Order el={el} key={el.id} />
          })
      ) : (
        orders.map(el => {
          return <Order el={el} key={el.id} />
        })
      )}
    </List>
  )
}
