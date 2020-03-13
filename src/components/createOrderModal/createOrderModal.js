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
  orderModalHandleCancel,
  visible,
  okText,
  modalTitle,
  state,
  userType
}) {
  const [orderId, setOrderId] = useState(state.id ? state.id : null)
  const [points, setPoints] = useState(state.points ? state.points : '')
  const [takeAddress, setTakeAddress] = useState(
    state.take_address ? state.take_address : ''
  )
  const [deliverAddress, setDeliverAddress] = useState(
    state.deliver_address ? state.deliver_address : ''
  )
  const [orderDescription, setOrderDescription] = useState(
    state.order_description ? state.order_description : ''
  )
  const [comment, setComment] = useState(state.comment ? state.comment : '')

  const [orderEndTime, setOrderEndTime] = useState(
    state.order_end_time ? state.order_end_time : ''
  )
  const [reciverName, setReciverName] = useState(
    state.receiver_name ? state.receiver_name : ''
  )
  const [reciverPhone, setReciverPhone] = useState(
    state.receiver_phone ? `${state.receiver_phone}`.slice(3) : ''
  )
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

  const [showReciverPhoneValidText, setShowReciverPhoneValidText] = useState(
    false
  )

  const [isOrderEditable, setIsOrderEditable] = useState(
    state.state ? state.state === 'pending' || state.state === 'done' : false
  )

  useEffect(() => {
    if (visible && okText === 'Update') {
      onHandleTakeAddressValidate()
      onHandleOrderDescValidate()
      onHandleDeliverAddressValidate()
      onHandleReciverNameValidate()
      onHandleReciverPhoneValidate()
      onHandlePointsValidate()
    }

    if (visible && okText === 'Create') {
      setPoints('')
      setTakeAddress('')
      setDeliverAddress('')
      setOrderDescription('')
      setComment('')
      setOrderEndTime(null)
      setReciverPhone('')
      setReciverName('')
    }

    onHandleOrderCommentValidate()
  }, [visible])

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
    setOrderEndTime(dateStrings)
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
    if (visible && okText === 'Create') {
      onHandleTakeAddressValidate()
      onHandleOrderDescValidate()
      onHandleDeliverAddressValidate()
      onHandleReciverNameValidate()
      onHandleReciverPhoneValidate()
      onHandlePointsValidate()
      onHandleOrderCommentValidate()
    }

    const order = {
      id: orderId,
      points: points,
      take_address: takeAddress,
      deliver_address: deliverAddress,
      order_description: orderDescription,
      comment: comment,
      order_end_time: orderEndTime,
      receiver_name: reciverName,
      receiver_phone: selectPhonePrefix + reciverPhone,
    }

    if (!isTakeAddressValid) {
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
    } else if (
      !isTakeAddressValid &&
      !isOrderDescValid &&
      !isOrderCommentValid &&
      !isDeliverAddressValid &&
      !isReciverPhoneValid &&
      !isPointsValid &&
      !isReciverNameValid
    ) {
      setShowTakeAddressValidText(true)
      setShowOrderDescValidText(true)
      setShowOrderCommentValidText(true)
      setShowDeliverAddressValidText(true)
      setShowReciverPhoneValidText(true)
      setShowPointValidText(true)
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
      disabled={isOrderEditable}
      defaultValue="374"
      onChange={onSelectPhonePrefix}
      style={{ width: 70 }}>
      <Option selected value="374">
        +374
      </Option>
    </Select>
  )

  function disabledDate(current) {
    return current < moment().subtract(1, 'days')
  }

  function range(start, end) {
    const result = []
    for (let i = start; i < end; i++) {
      result.push(i)
    }
    return result
  }

  function disabledDateTime() {
    const currentTime = new Date()
    currentTime.getHours()
    return {
      disabledHours: () => range(0, currentTime.getHours()),
    }
  }

  const dateFormat = 'L'

  return (
    <Modal
      title={modalTitle}
      style={{ top: 20 }}
      width={756}
      visible={visible}
      okText={okText}
      okButtonProps={{ disabled: isOrderEditable }}
      onOk={handleCreateOrder}
      onCancel={orderModalHandleCancel}>
      <Form className="create_order_form">
        <SubTitle>Sender</SubTitle>
        <Form.Item
          label="Pick up address"
          className="sender"
          validateStatus={showTakeAddressValidText ? 'error' : 'success'}
          hasFeedback={showTakeAddressValidText}
          help={
            showTakeAddressValidText
              ? 'The input exceeds the limit on the number of characters allowed'
              : ''
          }>
          <Input
            disabled={isOrderEditable}
            onChange={e => handleTakeAddressChange(e)}
            onBlur={onHandleTakeAddressValidate}
            value={takeAddress}
            placeholder="Pick up address"
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        </Form.Item>
        <Form.Item
          label="Description"
          className="sender"
          validateStatus={showOrderDescValidText ? 'error' : 'success'}
          hasFeedback={showOrderDescValidText}
          help={
            showOrderDescValidText
              ? 'The input exceeds the limit on the number of characters allowed'
              : ''
          }>
          <Input
            disabled={isOrderEditable}
            onChange={e => handleOrderDescriptionChange(e)}
            onBlur={onHandleOrderDescValidate}
            value={orderDescription}
            placeholder="Description"
          />
        </Form.Item>

        <SubTitle>Receiver</SubTitle>

        <Form.Item
          label="Destination address"
          className='receiver'
          validateStatus={showDeliverAddressValidText ? 'error' : 'success'}
          hasFeedback={showDeliverAddressValidText}
          help={
            showDeliverAddressValidText
              ? 'The input exceeds the limit on the number of characters allowed'
              : ''
          }>
          <Input
            disabled={isOrderEditable}
            onChange={e => handleDeliverAddressChange(e)}
            value={deliverAddress}
            onBlur={onHandleDeliverAddressValidate}
            placeholder="Destination address"
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        </Form.Item>
        <Form.Item
          label="Receiver phone"
          className='receiver'
          validateStatus={showReciverPhoneValidText ? 'error' : 'success'}
          hasFeedback={showReciverPhoneValidText}
          help={
            showReciverPhoneValidText
              ? 'Phone number should contain only 8 digit either ( e.g "12345678" or "12-345-678")'
              : ''
          }>
          <Input
            disabled={isOrderEditable}
            onChange={e => handleReciverPhoneChange(e)}
            onBlur={onHandleReciverPhoneValidate}
            value={reciverPhone}
            addonBefore={prefixSelector}
            placeholder="Receiver phone number"
          />
        </Form.Item>
        <Form.Item
          label="Receiver name"
          className='receiver'
          validateStatus={showReciverNameValidText ? 'error' : 'success'}
          hasFeedback={showReciverNameValidText}
          help={
            showReciverNameValidText
              ? 'The input exceeds the limit on the number of characters allowed'
              : ''
          }>
          <Input
            disabled={isOrderEditable}
            onChange={e => handleReciverNameChange(e)}
            onBlur={onHandleReciverNameValidate}
            value={reciverName}
            placeholder="Receiver name"
            prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <SubTitle>Order options</SubTitle>
        <Form.Item
          label="Shipping fee"
          validateStatus={showPointValidText ? 'error' : 'success'}
          hasFeedback={showPointValidText}
          help={showPointValidText ? 'Incorrect input value' : ''}>
          <Input
            disabled={isOrderEditable}
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
          <DatePicker
            disabled={isOrderEditable}
            disabledDate={disabledDate}
            //disabledTime={disabledDateTime}
            // defaultValue={[
            //   orderStartTime ? moment(orderStartTime, dateFormat) : null,
            //   orderEndTime ? moment(orderEndTime, dateFormat) : null,
            // ]}
            // format={dateFormat}
            showTime={{
              hideDisabledOptions: true,
              minuteStep: 5,
              format: 'HH:mm',
            }}
            onChange={onTimeChangeChange}
          />
        </Form.Item>
        <Form.Item
          label="Comment"
          validateStatus={showOrderCommentValidText ? 'error' : 'success'}
          hasFeedback={showOrderCommentValidText}
          help={showOrderCommentValidText ? 'You are exceeding the limit' : ''}>
          <TextArea
            disabled={isOrderEditable}
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
