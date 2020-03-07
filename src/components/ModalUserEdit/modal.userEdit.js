import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { Input } from 'antd'
import { Avatar } from 'antd'
import './modal.userEdit.css'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  DeleteFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
const { confirm } = Modal
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
  removeUser,
}) => {
  const [state, setState] = useState(modalUser)
  const { id, name, lastName, address, phone, avatar, approved } = state
  useEffect(() => {
    setState({
      ...state,
      ...modalUser,
    })
  }, [modalUser])

  const showConfirmRemove = () => {
    confirm({
      title: 'Do you want to delete ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeUser(id), handleCancel()
      },
      onCancel() {},
    })
  }

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
  const handleAcceptUser = () => {
    updateUser({ ...modalUser, approved: 'accepted' })
    setState({ ...state, approved: 'accepted' })
  }
  const handleDeclineUser = () => {
    updateUser({ ...modalUser, approved: 'declined' })
    setState({ ...state, approved: 'declined' })
  }
  const handleRemove = () => {
    removeUser(id)
    handleCancel()
  }
  return (
    <div>
      <Modal
        title="EDIT USER"
        visible={visible}
        okText="Update"
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Avatar src={avatar} size={64} />
          <div style={{ display: 'flex' }}>
            <CheckCircleFilled
              onClick={handleAcceptUser}
              style={{
                fontSize: '30px',
                color: 'orange',
                marginLeft: '5px',
                display: `${approved === 'accepted' ? 'none' : 'block'}`,
              }}
            />
            <CloseCircleFilled
              style={{
                fontSize: '30px',
                color: 'red',
                marginLeft: '5px',
                display: `${approved === 'declined' ? 'none' : 'block'}`,
              }}
              onClick={handleDeclineUser}
            />
            <div>
              <DeleteFilled
                onClick={showConfirmRemove}
                style={{
                  fontSize: '30px',
                  color: '#595959',
                  marginLeft: '5px',
                }}
              />
            </div>
          </div>
        </div>

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
