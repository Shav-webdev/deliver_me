import React, { useEffect, useState } from 'react'
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
  hasMoreOrder,
}) {
  const loadMoreDataBtnHandleClick = () => {
    const createdTime = orders[orders.length - 1].createdTime
    getMoreData(state, createdTime)
    setIsClicked(true)
  }
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    console.log('clicked')
  }, [isClicked])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <List className="company_orders_list_wrapper">
        {orders.length > 0 ? (
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
          <Title level={3} style={{ textAlign: 'center' }}>
            There are no orders
          </Title>
        )}
        <div style={{ textAlign: 'center' }}>
          {hasMoreOrder && (
            <Button onClick={loadMoreDataBtnHandleClick}>Load more</Button>
          )}
        </div>
      </List>
    </>
  )
}
