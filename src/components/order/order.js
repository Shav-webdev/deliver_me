import React, { useEffect, useState, useCallback } from 'react'
import List from 'antd/es/list'
import CreateOrderModal from '../createOrderModal/createOrderModal'

export default function Order({ el }) {
  const [visible, setVisible] = useState(false)

  const handleUpdateOrderClick = () => {
    setVisible(true)
  }

  const modalHandleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <List.Item onClick={handleUpdateOrderClick} className="orders_list_item">
        <div>
          <p>
            <strong>Order :</strong>
            {el.order_description}
          </p>
          <p>
            <strong>Money :</strong>
            {el.points}
          </p>
        </div>
        <div>
          <p>
            <strong>Take address :</strong>
            {el.take_address}
          </p>
          <p>
            <strong>Deliver address :</strong>
            {el.deliver_address}
          </p>
        </div>
        <div>
          <p>
            <strong>Status :</strong>
            {el.state}
          </p>
        </div>
      </List.Item>
      <CreateOrderModal
        visible={visible}
        // handleCreateOrderSubmit={handleCreateOrderSubmit}
        modalHandleCancel={modalHandleCancel}
      />
    </>
  )
}
