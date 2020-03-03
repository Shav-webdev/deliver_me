import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import { Input } from 'antd'
import { Avatar } from 'antd'
const defaultState = {
  name: '',
  lastName: '',
  phone: '',
  address: '',
}
const ModalUserEdit = ({
  handleCancel,
  handleOk,
  visible,
  modalUser,
  updateUser,
}) => {
  const [state, setState] = useState(modalUser)
  const { name, lastName, address, phone } = state
  useEffect(() => {
    setState({
      ...state,
      ...modalUser,
    })
    console.log(modalUser)
  }, [modalUser])

  const handleInputChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    })
    console.log(state)
  }
  const handleSubmit = () => {
    updateUser(state)
    handleCancel()
    setState(defaultState)
  }

  return (
    <div>
      <Modal
        title="EDIR USER"
        visible={visible}
        okText='Update'
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <Avatar size={64} />
        <Input
          name="name"
          onChange={handleInputChange}
          value={name}
          placeholder="Name"
        />
        <Input
          name="lastName"
          onChange={handleInputChange}
          value={lastName}
          placeholder="Last Name"
        />
        <Input
          name="phone"
          onChange={handleInputChange}
          value={phone}
          placeholder="Phone"
        />
        <Input
          name="address"
          onChange={handleInputChange}
          value={address}
          placeholder="Address"
        />
      </Modal>
    </div>
  )
}
export default ModalUserEdit
