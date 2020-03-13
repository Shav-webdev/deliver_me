import React, { useEffect, useState } from 'react'
import { Form, Input, Icon, Select, DatePicker, Typography } from 'antd'
import Modal from 'antd/es/modal'
const { RangePicker } = DatePicker
const { Option } = Select
const { TextArea } = Input
import './ViewOrder.css'
import moment from 'moment'
import SubTitle from '../subTitle/subTitle'
function ViewOrderModal({ data, show, state, setVisibleOrder, hideViewModal }) {
  const {
    points,
    comment,
    id,
    take_address,
    deliver_address,
    receiver_name,
    receiver_phone,
    company_name,
    order_description,
    order_start_time,
    order_end_time,
  } = data

  const [visible, setSetShow] = useState(show)

  useEffect(() => {
    setSetShow(show)
  }, [show])

  const handleSubmit = (e) => {
    e.stopPropagation()
      setSetShow(false)
      setVisibleOrder(false)
    
    
  }

  return (
    <Modal
      title={'Order'}
      visible={visible}
      style={{ top: 20 }}
      width={756}
      cancelButtonProps={{ style: { display: 'none' } }}
      onOk={handleSubmit}>
      <Form className="view_order_form">
        <SubTitle>Sender</SubTitle>

        <Form.Item label="Description">
          <Typography>{order_description}</Typography>
        </Form.Item>
        <Form.Item label="Take address">
          {}
          <Typography>
            <Icon
              type="environment"
              style={{ color: 'rgba(0,0,0,.25)', marginRight: '10px' }}
            />
            {take_address}
          </Typography>
        </Form.Item>
        {state !== 'active' ? <SubTitle>Receiver</SubTitle> : ''}
        <Form.Item label="Receiver address" className="receiver">
          <Typography>
            <Icon
              type="environment"
              style={{ color: 'rgba(0,0,0,.25)', marginRight: '10px' }}
            />
            {deliver_address}
          </Typography>
        </Form.Item>
        {state !== 'active' && (
          <Form.Item label="Receiver phone" className="receiver">
            <Typography>{receiver_phone}</Typography>
          </Form.Item>
        )}
        {state !== 'active' && (
          <Form.Item label="Receiver name" className="receiver">
            <Typography>
              <Icon
                type="name"
                style={{ color: 'rgba(0,0,0,.25)', marginRight: '10px' }}
              />
              {receiver_name}
            </Typography>
          </Form.Item>
        )}
        <SubTitle>Order options</SubTitle>
        <Form.Item label="Point(AMD)">
          <Typography>
            <Icon
              type="DollarOutlined"
              style={{ color: 'rgba(0,0,0,.25)', marginRight: '10px' }}
            />
            {points}
          </Typography>
        </Form.Item>
        <Form.Item className="order_range_picker" label="Order time range">
          <Typography>{order_end_time}</Typography>
        </Form.Item>
        <Form.Item label="Comment">
          <TextArea disabled value={comment} placeholder="Comment" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ViewOrderModal
