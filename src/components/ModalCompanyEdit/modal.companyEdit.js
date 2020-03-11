import React, { useState, useEffect } from 'react'
import { Modal, Input, Avatar } from 'antd'
import './modal.companyEdit.css'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  DeleteFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { errorMessage } from '../../services/services'

const { confirm } = Modal
const defaultState = {
  name: '',
  taxNumber: '',
  phone: '',
  address: '',
  avatar: '',
  addMoney: 0,
}
export const ModalCompanyEdit = ({
  handleCancel,
  visible,
  modalCompany,
  updateCompany,
  removeCompany,
}) => {
  const [state, setState] = useState(modalCompany)
  const [error, setError] = useState({
    name: false,
    activity: false,
    phone: false,
    address: false,
    taxNumber: false,
  })
  const {
    name,
    taxNumber,
    avatar,
    address,
    phone,
    amount,
    approved,
    addMoney,
    activity,
  } = state

  useEffect(() => {
    setState({
      ...state,
      ...modalCompany
    })
  }, [modalCompany])

  const showConfirmRemove = () => {
    confirm({
      title: 'Do you want to delete ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeCompany(id), handleCancel()
      },
      onCancel() { },
    })
  }

  const handleInputChange = ({ target: { name, value } }) => {
    if (value === '' || name === 'taxNumber' && value.toString().length !== 8) {
      setError({
        ...error,
        [name]: true,
      })
    } else if (name === 'taxNumber' && value.toString().length === 8) {
      setError({
        ...error,
        [name]: false,
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
    console.log(error)
  }
  const handleSubmit = () => {
    if (
      !error.address &&
      !error.taxNumber &&
      taxNumber.toString().length === 8 &&
      !error.name &&
      !error.phone &&
      !error.activity
    ) {
      updateCompany({
        ...state,
        amount: Number(state.addMoney) + Number(amount),
      })
      handleCancel()
      setState(defaultState)
    } else {
      errorMessage('Input fields are invalid !')
    }
  }
  const handleAcceptCompany = () => {
    updateCompany({ ...modalCompany, approved: 'accepted' })
    setState({ ...modalCompany, approved: 'accepted' })
  }
  const handleDeclineCompany = () => {
    updateCompany({ ...modalCompany, approved: 'declined' })
    setState({ ...modalCompany, approved: 'declined' })
  }

  return (
    <div>
      <Modal
        title="EDIT COMPANY"
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
              onClick={handleAcceptCompany}
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
              onClick={handleDeclineCompany}
            />
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
        <Input
          addonAfter="Name"
          className="input_margin"
          name="name"
          onChange={handleInputChange}
          value={name}
          placeholder="Name"
        />
        <p
          style={{
            color: error.name ? 'red' : 'white',
            margin: '0 5px',
          }}>
          Name is required
        </p>
        <Input
          addonAfter="TaxNumber"
          name="taxNumber"
          onChange={handleInputChange}
          value={taxNumber}
          placeholder="TaxNumber"
          type='number'
        />
        <p
          style={{
            color: error.taxNumber ? 'red' : 'white',
            margin: '0 5px',
          }}>
          TaxNumber is required and must have 8 digits
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
            color: error.address ? 'red' : 'white',
            margin: '0 5px',
          }}>
          Address is required
        </p>
        <Input
          addonAfter="Activity"
          name="activity"
          onChange={handleInputChange}
          value={activity}
          placeholder="Activity"
        />
        <p
          style={{
            color: error.activity ? 'red' : 'white',
            margin: '0 5px',
          }}>
          Activity is required
        </p>
        <Input
          addonAfter="Phone"
          name="phone"
          onChange={handleInputChange}
          value={phone}
          placeholder="Phone"
          type='number'
        />
        <p
          style={{
            color: error.phone ? 'red' : 'white',
            margin: '0 5px',
            height: "100%"
          }}>Phone is required</p>
        <Input
          type="number"
          addonAfter="Add money"
          name="addMoney"
          value={addMoney}
          onChange={handleInputChange}
          className="input_money"
          defaultValue={0}
        />
      </Modal>
    </div>
  )
}
