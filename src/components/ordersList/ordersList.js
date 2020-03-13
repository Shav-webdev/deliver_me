import React from 'react'
import Spinner from '../spiner/spinner'
import List from 'antd/es/list'
import Order from '../order/order'
import { Typography, Button } from 'antd'

const { Title } = Typography

export default function OrdersList({
  state,
  loading,
  orders,
  companyId,
  getMoreData,
}) {
  const loadMoreDataBtnHandleClick = () => {
    console.log('state', state)
    console.log('orders', orders)
    getMoreData(state, orders)
  }

  return (
    <>
      <List className="company_orders_list_wrapper">
        {loading ? (
          <Spinner />
        ) : orders.length > 0 ? (
          orders.map(el => {
            return (
              <Order
                companyId={companyId}
                el={el}
                key={el.id}
                orderKey={el.id}
              />
            )
          })
        ) : (
          <Title style={{ textAlign: 'center' }}>There are no order</Title>
        )}
        <div style={{ textAlign: 'center' }}>
          <Button onClick={loadMoreDataBtnHandleClick}>Load more</Button>
        </div>
      </List>
    </>
  )
}
