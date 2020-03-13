import React, { useState } from 'react'
import { Button } from 'antd'
import './cardUser.css'
import CreateOrderModal from '../createOrderModal/createOrderModal'
import ViewOrderModal from '../viewOrderModal/ViewOrderModal'
function CardUser({ data, takeOrder, doneOrder, user, getActiveOrders, page }) {
  const {
    points,
    id,
    take_address,
    deliver_address,
    receiver_name,
    receiver_phone,
    company_name,
    order_description,
  } = data
  const [visible, setVisible] = useState(false)
  const handleTakeOrder = () => {
    takeOrder({
      id: id,
      state: 'pending',
      userId: user.id,
    })
  }
  const handleDoneOrder = () => {
    doneOrder({
      id: id,
      state: 'done',
      userId: user.id,
    })
  }
  const handleOpenModal = () => {
    setVisible(true)
  }
  const modalHandleCancel = () => {
    console.log('cancel')
    setVisible(false)
    console.log(visible)
    setVisible(false)
  }
  return (
    <div onClick={handleOpenModal} className="card-container">
      <ViewOrderModal
        visible={visible}
        orderModalHandleCancel={modalHandleCancel}
        data={data}
      />
      <div className="item-box">
        <div className="card-item">
          <p className="order">
            <strong>Order:</strong>
            <span> {order_description} </span>
          </p>
          <p className="money">
            <strong>Money:</strong> <span> {points}</span>
          </p>
        </div>
        <div className="card-item">
          <p className="deliverer">
            <strong>Company:</strong> <span> {company_name}</span>{' '}
          </p>
          {page !== 'a_orders' ? (
            <p className="deliverer-phone">
              <strong>Receiver Phone:</strong> <span>{receiver_phone}</span>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="item-box">
        <div className="card-item">
          <p className="take-address">
            <strong>Take Addres:</strong> <span> {take_address}</span>{' '}
          </p>
          <p className="deliver-address">
            <strong>Deliver Address:</strong> <span> {deliver_address} </span>
          </p>
        </div>
        <div className="card-item">
          {page !== 'a_orders' ? (
            <p className="status">
              <strong>Reciever Name:</strong> <span> {receiver_name} </span>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="buttons item-box">
        {page === 'a_orders' ? (
          <Button
            type="button"
            id="btn"
            className="delete-button"
            onClick={handleTakeOrder}>
            Take
          </Button>
        ) : (
          ''
        )}
        {page === 'my_pending' ? (
          <Button
            type="button"
            id="btn"
            className="delete-button"
            onClick={handleDoneOrder}>
            Done
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default CardUser
