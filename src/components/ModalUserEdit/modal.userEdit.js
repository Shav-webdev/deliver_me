import React, { useState, useEffect } from 'react'
import { Modal, Form } from 'antd'
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
import { errorMessage, successMessage } from '../../services/services'
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
  const [error, setError] = useState({
    name: false,
    lastName: false,
    phone: false,
    address: false,
  })
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
      onCancel() { },
    })
  }

  const handleInputChange = ({ target: { name, value } }) => {
    if (value === '') {
      setError({
        ...error,
        [name]: true,
      })
    } else {
      setError({
        ...error,
        [name]: false,
      })
    }
    setState({
      ...state,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    if (!error.address && !error.lastName && !error.name && !error.phone) {
      updateUser(state)
      handleCancel()
      setState(defaultState)
      // successMessage('Data successfully updated !')
    } else {
      errorMessage('Input fields are invalid !')
    }
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
        <Form.Item label="Username" hidden={true}>
          <Input type="text" />
        </Form.Item>
        <Input
          addonAfter="Name"
          name="name"
          onChange={handleInputChange}
          value={name}
          className="input_margin"
          placeholder="Name"
        />
        <p
          style={{
            color: error.name ? 'red' : "white",
            margin: '0 5px',
          }}>
          Name is required
        </p>
        <Input
          addonAfter="LastName"
          name="lastName"
          onChange={handleInputChange}
          value={lastName}
          placeholder="LastName"
        />
        <p
          style={{
            color: error.lastName ? 'red' : "white",
            margin: '0 5px',
          }}>
          LastName is required
        </p>
        <Input
          addonAfter="Phone"
          name="phone"
          onChange={handleInputChange}
          value={phone}
          type='number'
          placeholder="Phone"
        />
        <p
          style={{
            color: error.phone ? 'red' : "white",
            margin: '0 5px',
          }}>
          Phone is required
        </p>
        <Input
          addonAfter="Address"
          name="address"
          onChange={handleInputChange}
          value={address}
          placeholder="Address"
        />
        <p
          style={{
            color: error.address ? 'red' : "white",
            margin: '0 5px',
          }}>
          Address is required
        </p>
      </Modal>
    </div>
  )
}
