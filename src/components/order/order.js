import React, { useEffect, useState, useCallback } from 'react'
import List from 'antd/es/list'
import CreateOrderModal from '../createOrderModal/createOrderModal'
import {
  createCompanyOrderThunk,
  removeCompanyOrderThunk,
} from '../../redux/thunk/orders.thunks'
import { connect } from 'react-redux'
import { Button } from 'antd'
import ConfirmModal from '../confirmModal/confirmModal'
import { socket } from '../../services/socket'
import audioSound from '../../assets/sound.mp3'
import OrderRate from '../orderRate/orderRate'

function Order({ el, updateOrder, deleteOrder, companyId, orderKey }) {
  const [visible, setVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)

  const audio = new Audio()

  const handleUpdateOrderClick = () => {
    setVisible(true)
  }

  const orderModalHandleCancel = () => {
    setVisible(false)
  }

  const handleUpdateOrderSubmit = order => {
    const data = order
    updateOrder(data)

    socket.emit('user_take_order', data => {
      console.log(data)
      audio.src = audioSound
      audio.play()
    })

    setVisible(false)
  }
  const onDeleteBtnClick = e => {
    e.stopPropagation()
    setConfirmVisible(true)
  }

  const modalHandleCancel = () => {
    setConfirmVisible(false)
  }

  const handleDeleteOrder = () => {
    deleteOrder(companyId, el.id)
    setConfirmVisible(false)
  }

  const getOrderRate = rate => {
    const data = { companyId, rate }
    console.log(data)
    //updateOrder(data)
  }

  return (
    <>
      <List.Item
        onClick={handleUpdateOrderClick}
        key={orderKey}
        className="orders_list_item">
        <div className="orders_list_item_elem">
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
          {el.state === 'pending' && (
            <div>
              <p>
                <strong>Deliverer :</strong>
                {el.user_name}
              </p>
              <p>
                <strong>Deliverer phone :</strong>
                {el.user_phone}
              </p>
            </div>
          )}
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
        </div>
        <div className="order_footer">
          {el.state !== 'pending' && (
            <Button onClick={onDeleteBtnClick}>Delete</Button>
          )}
          {el.state === 'done' && <OrderRate getOrderRate={getOrderRate} />}
        </div>
      </List.Item>
      <CreateOrderModal
        visible={visible}
        handleCreateOrderSubmit={handleUpdateOrderSubmit}
        orderModalHandleCancel={orderModalHandleCancel}
        modalTitle="Edit Request"
        okText="Update"
        state={el}
      />
      <ConfirmModal
        handleOk={handleDeleteOrder}
        visible={confirmVisible}
        modalHandleCancel={modalHandleCancel}
        confirmVisible={confirmVisible}
        title="Delete Order"
        okText="Delete">
        Are you sure to delete this order ?
      </ConfirmModal>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateOrder: data => dispatch(createCompanyOrderThunk(data)),
    deleteOrder: (companyId, orderId) =>
      dispatch(removeCompanyOrderThunk(companyId, orderId)),
  }
}

export default connect(null, mapDispatchToProps)(Order)
