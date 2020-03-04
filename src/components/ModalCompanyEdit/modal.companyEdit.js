import React, { useState, useEffect } from 'react'
import { Modal, Input, Avatar } from 'antd'
import './modal.companyEdit.css'
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
}) => {
  const [state, setState] = useState(modalCompany)
  const { name, taxNumber, avatar, address, phone, amount, addMoney } = state
  useEffect(() => {
    setState({
      ...state,
      ...modalCompany,
    })
  }, [modalCompany])

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

  return (
    <div>
      <Modal
        title="EDIT COMPANY"
        visible={visible}
        okText="Update"
        onOk={handleSubmit}
        onCancel={handleCancel}>
        <Avatar src={avatar} size={64} />
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
