import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { Input } from 'antd'
import { Avatar } from 'antd'
import './modal.userEdit.css'
const defaultState = {
  name: '',
  lastName: '',
  phone: '',
  address: '',
  avatar: '',
}
export const ModalUserEdit = ({
  handleCancel,
  handleOk,
  visible,
  modalUser,
  updateUser,
}) => {
  const [state, setState] = useState(modalUser)
  const { name, lastName, address, phone, avatar } = state
  useEffect(() => {
    setState({
      ...state,
      ...modalUser,
    })
  }, [modalUser])

  const handleInputChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    updateUser(state)
    handleCancel()
    setState(defaultState)
  }

  return (
    <div>
      <Modal
        title="EDIT USER"
        visible={visible}
        okText="Update"
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <Avatar src={avatar} size={64} />
        <Input
          addonAfter="Name"
          name="name"
          onChange={handleInputChange}
          value={name}
          className="input_margin"
          placeholder="Name"
        />
        <Input
          addonAfter="LastName"
          name="lastName"
          className="input_margin"
          onChange={handleInputChange}
          value={lastName}
          placeholder="Last Name"
        />
        <Input
          addonAfter="Phone"
          name="phone"
          className="input_margin"
          onChange={handleInputChange}
          value={phone}
          placeholder="Phone"
        />
        <Input
          addonAfter="Address"
          name="address"
          onChange={handleInputChange}
          value={address}
          className="input_margin"
          placeholder="Address"
        />
      </Modal>
    </div>
  )
}
