import React, { useState } from 'react'
import { Button, Typography } from 'antd'
import { socket } from '../../services/socket'
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
    state,
  } = data
  const [show, setVisibleOrder] = useState(false)
  const handleTakeOrder = e => {
    e.stopPropagation()
    takeOrder({
      id: id,
      state: 'pending',
      userId: user.id,
    })
    socket.emit('user_take_order', { userId: user.id })
  }
  const handleDoneOrder = e => {
    console.log('done')
    e.stopPropagation()
    doneOrder({
      id: id,
      state: 'done',
      userId: user.id,
    })
  }
  const handleOpen = () => {
    console.log("open")
    //if(show!==true){
    setVisibleOrder(true)
    //}

  }

  return (
    <div onClick={handleOpen} className="card-container">
      <ViewOrderModal
        show={show}
        state={state}
        setVisibleOrder={setVisibleOrder}
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
