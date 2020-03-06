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
const { confirm } = Modal
const defaultState = {
  name: '',
  taxNumber: '',
  phone: '',
  address: '',
  avatar: '',
  amount: 0,
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
      ...modalCompany,
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
    updateCompany({ ...state, amount: Number(state.addMoney) + Number(amount) })
    handleCancel()
    setState(defaultState)
  }
  const handleAcceptCompany = () => {
    updateCompany({ ...modalCompany, approved: 'accepted' })
    setState({ ...modalCompany, approved: 'accepted' })
  }
  const handleDeclineCompany = () => {
    updateCompany({ ...modalCompany, approved: 'declined' })
    setState({ ...modalCompany, approved: 'declined' })
  }
  const handleRemove = () => {
    removeCompany(id)
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
                marginLeft:"5px",
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
        <Input
          addonAfter="TaxNumber"
          className="input_margin"
          name="taxNumber"
          onChange={handleInputChange}
          value={taxNumber}
          placeholder="TaxNumber"
        />
        <Input
          addonAfter="Phone"
          className="input_margin"
          name="phone"
          onChange={handleInputChange}
          value={phone}
          placeholder="Phone"
        />
        <Input
          addonAfter="Address"
          className="input_margin"
          name="address"
          onChange={handleInputChange}
          value={address}
          placeholder="Address"
        />
        <Input
          addonAfter="Activity"
          className="input_margin"
          name="activity"
          onChange={handleInputChange}
          value={activity}
          placeholder="Activity"
        />
        <Input
          type="number"
          addonAfter="Add money"
          name="addMoney"
          value={addMoney}
          onChange={handleInputChange}
          className="input_margin input_money"
          defaultValue={0}
        />
      </Modal>
    </div>
  )
}
