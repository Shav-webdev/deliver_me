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

function Order({ el, updateOrder, deleteOrder, companyId }) {
  const [visible, setVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)

  const handleUpdateOrderClick = () => {
    setVisible(true)
  }

  const modalHandleCancel = () => {
    setVisible(false)
  }

  const handleUpdateOrderSubmit = order => {
    const data = order
    console.log(order)
    updateOrder(data)
    setVisible(false)
  }
  const onDeleteBtnClick = e => {
    e.stopPropagation()
    setConfirmVisible(true)
  }

  const deleteModalHandleCancel = () => {
    setConfirmVisible(false)
  }

  const handleDeleteOrder = () => {
    console.log(el)
    deleteOrder(companyId, el.id)
    setConfirmVisible(false)
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
          {el.state !== 'pending' && (
            <Button onClick={onDeleteBtnClick}>Delete</Button>
          )}
        </div>
      </List.Item>
      <CreateOrderModal
        visible={visible}
        handleCreateOrderSubmit={handleUpdateOrderSubmit}
        modalHandleCancel={modalHandleCancel}
        modalTitle="Edit Request"
        okText="Update"
        state={el}
      />
      <ConfirmModal
        handleDeleteOrder={handleDeleteOrder}
        visible={confirmVisible}
        deleteModalHandleCancel={deleteModalHandleCancel}
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
