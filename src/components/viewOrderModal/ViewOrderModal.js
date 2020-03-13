import React from 'react'
import { Form, Input } from 'antd'
import Modal from 'antd/es/modal'
import SubTitle from '../subTitle/subTitle'
function ViewOrderModal({ data, visible, setVisible, orderModalHandleCancel }) {
  //   const {
  //     points,
  //     id,
  //     take_address,
  //     deliver_address,
  //     receiver_name,
  //     receiver_phone,
  //     company_name,
  //     order_description,
  //   } = data
  return (
    <Modal
      title={'Order'}
      style={{ top: 20 }}
      width={756}
      onCancel={orderModalHandleCancel}>
      <Form className="create_order_form">
        <SubTitle>Sender</SubTitle>
        <Form.Item label="Take address">
          <Input
            disabled
            value={take_address}
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input disabled value={orderDescription} />
        </Form.Item>

        <SubTitle>Receiver</SubTitle>

        <Form.Item label="Receiver address" className="receiver">
          <Input
            disabled
            value={deliverAddress}
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
          />
        </Form.Item>
        <Form.Item label="Receiver phone" className="receiver">
          <Input
            disabled={isOrderEditable}
            value={reciverPhone}
            addonBefore={prefixSelector}
          />
        </Form.Item>
        <Form.Item label="Receiver name" className="receiver">
          <Input
            disabled={isOrderEditable}
            value={reciverName}
            prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <SubTitle>Order options</SubTitle>
        <Form.Item label="Point(AMD)">
          <Input
            disabled
            value={points}
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
            disabled
            disabledDate
            disabledTime
            defaultValue={[
              orderStartTime ? moment(orderStartTime, dateFormat) : null,
              orderEndTime ? moment(orderEndTime, dateFormat) : null,
            ]}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item label="Comment">
          <TextArea disabled value={comment} placeholder="Comment" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ViewOrderModal
