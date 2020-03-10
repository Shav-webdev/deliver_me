import React, { useEffect, useState, useCallback } from 'react'
import { Icon, Form, Input, DatePicker, Select } from 'antd'
import Modal from 'antd/es/modal'
import moment from 'moment'
import {
  validateName,
  validateAddress,
  validatePhoneNumber,
  validatePoint,
  validateOrderComment,
} from '../../pages/registration/helpers/validations'
import SubTitle from '../subTitle/subTitle'

const { TextArea } = Input
const { RangePicker } = DatePicker
const { Option } = Select

export default function CreateOrderModal({
  handleCreateOrderSubmit,
  modalHandleCancel,
  visible,
}) {
  const [points, setPoints] = useState('')
  const [takeAddress, setTakeAddress] = useState('')
  const [deliverAddress, setDeliverAddress] = useState('')
  const [orderDescription, setOrderDescription] = useState('')
  const [comment, setComment] = useState('')
  const [orderStartTime, setOrderStartTime] = useState('')
  const [orderEndTime, setOrderEndTime] = useState('')
  const [reciverName, setReciverName] = useState('')
  const [reciverPhone, setReciverPhone] = useState('')
  const [isOrderDescValid, setIsOrderDescValid] = useState(null)
  const [isTakeAddressValid, setIsTakeAddressValid] = useState(null)
  const [isDeliverAddressValid, setIsDeliverAddressValid] = useState(null)
  const [isReciverPhoneValid, setIsReciverPhoneValid] = useState(null)
  const [selectPhonePrefix, setSelectPhonePrefix] = useState('374')
  const [isReciverNameValid, setIsReciverNameValid] = useState(null)
  const [isPointsValid, setIsPointsValid] = useState(null)
  const [isOrderCommentValid, setIsOrderCommentValid] = useState(null)
  const [showPointValidText, setShowPointValidText] = useState(false)
  const [showOrderDescValidText, setShowOrderDescValidText] = useState(false)
  const [showReciverNameValidText, setShowReciverNameValidText] = useState(
    false
  )
  const [showOrderCommentValidText, setShowOrderCommentValidText] = useState(
    false
  )
  const [showTakeAddressValidText, setShowTakeAddressValidText] = useState(
    false
  )
  const [
    showDeliverAddressValidText,
    setShowDeliverAddressValidText,
  ] = useState(false)
  const [showSenderPhoneValidText, setShowSenderPhoneValidText] = useState(
    false
  )

  const [showReciverPhoneValidText, setShowReciverPhoneValidText] = useState(
    false
  )

  const handlePointsChange = useCallback(e => {
    const orderPoint = e.target.value
    setPoints(orderPoint)
    setShowPointValidText(false)
  }, [])

  const onHandlePointsValidate = () => {
    if (validatePoint(points)) {
      setIsPointsValid(true)
      setShowPointValidText(false)
    } else {
      setIsPointsValid(false)
      setShowPointValidText(true)
    }
  }

  const handleTakeAddressChange = useCallback(e => {
    const orderTakeAddress = e.target.value
    setTakeAddress(orderTakeAddress)
    setShowTakeAddressValidText(false)
  }, [])
  const handleDeliverAddressChange = useCallback(e => {
    const orderDeliverAddress = e.target.value
    setDeliverAddress(orderDeliverAddress)
    setShowDeliverAddressValidText(false)
  }, [])

  const onHandleTakeAddressValidate = () => {
    if (validateAddress(takeAddress)) {
      setIsTakeAddressValid(true)
      setShowTakeAddressValidText(false)
    } else {
      setIsTakeAddressValid(false)
      setShowTakeAddressValidText(true)
    }
  }
  const onHandleDeliverAddressValidate = () => {
    if (validateAddress(deliverAddress)) {
      setIsDeliverAddressValid(true)
      setShowDeliverAddressValidText(false)
    } else {
      setIsDeliverAddressValid(false)
      setShowDeliverAddressValidText(true)
    }
  }

  const handleOrderDescriptionChange = useCallback(e => {
    const orderDescriptionField = e.target.value
    setOrderDescription(orderDescriptionField)
    setShowOrderDescValidText(false)
  }, [])

  const onHandleOrderDescValidate = () => {
    if (validateName(orderDescription)) {
      setIsOrderDescValid(true)
      setShowOrderDescValidText(false)
    } else {
      setIsOrderDescValid(false)
      setShowOrderDescValidText(true)
    }
  }

  const handleOrderCommentChange = useCallback(e => {
    const orderCommentField = e.target.value
    setComment(orderCommentField)
    setShowOrderCommentValidText(false)
  }, [])

  const onHandleOrderCommentValidate = () => {
    if (validateOrderComment(comment)) {
      setIsOrderCommentValid(true)
      setShowOrderCommentValidText(false)
    } else {
      setIsOrderCommentValid(false)
      setShowOrderCommentValidText(true)
    }
  }

  const onTimeChangeChange = (dates, dateStrings) => {
    setOrderStartTime(dateStrings[0])
    setOrderEndTime(dateStrings[1])
  }

  const handleReciverPhoneChange = useCallback(e => {
    const number = e.target.value
    setReciverPhone(number)
    setShowReciverPhoneValidText(false)
  }, [])

  const onHandleReciverPhoneValidate = () => {
    if (validatePhoneNumber(reciverPhone)) {
      setIsReciverPhoneValid(true)
      setShowReciverPhoneValidText(false)
    } else {
      setIsReciverPhoneValid(false)
      setShowReciverPhoneValidText(true)
    }
  }

  const handleReciverNameChange = useCallback(e => {
    let name = e.target.value
    setReciverName(name)
    setShowReciverNameValidText(false)
  }, [])

  const onHandleReciverNameValidate = () => {
    if (validateName(reciverName)) {
      setIsReciverNameValid(true)
      setShowReciverNameValidText(false)
    } else {
      setIsReciverNameValid(false)
      setShowReciverNameValidText(true)
    }
  }

  const handleCreateOrder = () => {
    const order = {
      points: points,
      take_address: takeAddress,
      deliver_address: deliverAddress,
      order_description: orderDescription,
      comment: comment,
      order_start_time: orderStartTime,
      order_end_time: orderEndTime,
      receiver_name: reciverName,
      receiver_phone: selectPhonePrefix + reciverPhone,
    }

    if (
      !isTakeAddressValid &&
      !isOrderDescValid &&
      !isOrderCommentValid &&
      !isDeliverAddressValid &&
      !isReciverPhoneValid &&
      !isPointsValid &&
      !isReciverNameValid
    ) {
      setShowTakeAddressValidText(true)
      setShowSenderPhoneValidText(true)
      setShowOrderDescValidText(true)
      setShowOrderCommentValidText(true)
      setShowDeliverAddressValidText(true)
      setShowReciverPhoneValidText(true)
      setShowPointValidText(true)
      setShowReciverNameValidText(true)
    } else if (!isTakeAddressValid) {
      setShowTakeAddressValidText(true)
    } else if (!isOrderDescValid) {
      setShowOrderDescValidText(true)
    } else if (!isOrderCommentValid) {
      setShowOrderCommentValidText(true)
    } else if (!isDeliverAddressValid) {
      setShowDeliverAddressValidText(true)
    } else if (!isReciverPhoneValid) {
      setShowReciverPhoneValidText(true)
    } else if (!isPointsValid) {
      setShowPointValidText(true)
    } else if (!isReciverNameValid) {
      setShowReciverNameValidText(true)
    } else {
      handleCreateOrderSubmit(order)
    }
  }

  const onSelectPhonePrefix = value => {
    setSelectPhonePrefix(value)
  }

  const prefixSelector = (
    <Select
      defaultValue="374"
      onChange={onSelectPhonePrefix}
      style={{ width: 70 }}>
      <Option selected value="374">
        +374
      </Option>
    </Select>
  )

  return (
    <Modal
      title="Create Request"
      style={{ top: 20 }}
      width={756}
      visible={visible}
      okText="Create order"
      onOk={handleCreateOrder}
      onCancel={modalHandleCancel}>
      <Form className="create_order_form">
        <SubTitle>Sender</SubTitle>
        <Form.Item
          label="Take address"
          validateStatus={showTakeAddressValidText ? 'error' : 'success'}
          hasFeedback={showTakeAddressValidText}
          help={
            showTakeAddressValidText
              ? 'Address should contain at least two characters'
              : ''
          }>
          <Input
            onChange={e => handleTakeAddressChange(e)}
            onBlur={onHandleTakeAddressValidate}
            value={takeAddress}
            placeholder="Take address"
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        </Form.Item>
        <Form.Item
          label="Description"
          validateStatus={showOrderDescValidText ? 'error' : 'success'}
          hasFeedback={showOrderDescValidText}
          help={
            showOrderDescValidText
              ? 'Description should contain at least two characters'
              : ''
          }>
          <Input
            onChange={e => handleOrderDescriptionChange(e)}
            onBlur={onHandleOrderDescValidate}
            value={orderDescription}
            placeholder="Description"
          />
        </Form.Item>

        <SubTitle>Reciver</SubTitle>

        <Form.Item
          label="Reciver address"
          validateStatus={showDeliverAddressValidText ? 'error' : 'success'}
          hasFeedback={showDeliverAddressValidText}
          help={
            showDeliverAddressValidText
              ? 'Address should contain at least two characters'
              : ''
          }>
          <Input
            onChange={e => handleDeliverAddressChange(e)}
            value={deliverAddress}
            onBlur={onHandleDeliverAddressValidate}
            placeholder="Deliver address"
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        </Form.Item>
        <Form.Item
          label="Reciver phone"
          validateStatus={showReciverPhoneValidText ? 'error' : 'success'}
          hasFeedback={showReciverPhoneValidText}
          help={
            showReciverPhoneValidText
              ? 'Phone number should contain only 8 digit either ( e.g "12345678" or "12-345-678")'
              : ''
          }>
          <Input
            onChange={e => handleReciverPhoneChange(e)}
            onBlur={onHandleReciverPhoneValidate}
            value={reciverPhone}
            addonBefore={prefixSelector}
            placeholder="Reciver phone number"
          />
        </Form.Item>
        <Form.Item
          label="Reciver name"
          validateStatus={showReciverNameValidText ? 'error' : 'success'}
          hasFeedback={showReciverNameValidText}
          help={
            showReciverNameValidText
              ? 'Name should contain at least two characters'
              : ''
          }>
          <Input
            onChange={e => handleReciverNameChange(e)}
            onBlur={onHandleReciverNameValidate}
            value={reciverName}
            placeholder="Reciver name"
            prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <SubTitle>Order options</SubTitle>
        <Form.Item
          label="Point(AMD)"
          validateStatus={showPointValidText ? 'error' : 'success'}
          hasFeedback={showPointValidText}
          help={showPointValidText ? 'Incorrect input value' : ''}>
          <Input
            onChange={e => handlePointsChange(e)}
            onBlur={onHandlePointsValidate}
            value={points}
            placeholder="Point"
            prefix={
              <Icon
                type="DollarOutlined"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            }
          />
        </Form.Item>
        <Form.Item className="order_range_picker" label="Order time range">
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'This Month': [
                moment().startOf('month'),
                moment().endOf('month'),
              ],
            }}
            showTime
            format="LLL"
            onChange={onTimeChangeChange}
          />
        </Form.Item>
        <Form.Item
          label="Comment"
          validateStatus={showOrderCommentValidText ? 'error' : 'success'}
          hasFeedback={showOrderCommentValidText}
          help={showOrderCommentValidText ? 'You are exceeding the limit' : ''}>
          <TextArea
            onChange={e => handleOrderCommentChange(e)}
            onBlur={onHandleOrderCommentValidate}
            value={comment}
            placeholder="Comment"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
