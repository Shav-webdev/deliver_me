import React, { useEffect, useState, useCallback } from 'react'
import {
  Button,
  Icon,
  Layout,
  Typography,
  message,
  Upload,
  Form,
  Input,
  Avatar,
  DatePicker,
} from 'antd'
import './profilePage.css'
import { getCookie } from '../registration/services/cookies'
import history from '../../routes/history'
import { connect } from 'react-redux'
import List from 'antd/es/list'
import company_avatar from '../../assets/images/company_avatar.png'
import axios from 'axios'
import Popover from 'antd/es/popover'
import { logOut } from '../registration/services/services'
import Modal from 'antd/es/modal'
import Menu from 'antd/es/menu'
import moment from 'moment'
import { signInAs } from '../../redux/thunk'
import Spinner from '../../components/spiner/spinner'

const { Title } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

const { Header, Sider } = Layout

function ProfilePage(props) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [visible, setVisible] = useState(false)
  const [points, setPoints] = useState('')
  const [takeAddress, setTakeAddress] = useState('')
  const [deliverAddress, setDeliverAddress] = useState('')
  const [orderDescription, setOrderDescription] = useState('')
  const [comment, setComment] = useState('')
  const [orderStartTime, setOrderStartTime] = useState('')
  const [orderEndTime, setOrderEndTime] = useState('')

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const handleImageChange = event => {
    if (event.file.status === 'done') {
      console.log(event)
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfeoo5iog/upload'
      const CLOUDINARY_UPLOAD_PRESET = 'lvxujt8u'
      const formData = new FormData()
      formData.append('file', event.file.originFileObj)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      return axios
        .post(CLOUDINARY_URL, formData)
        .then(res => {
          setAvatarUrl(res.data.url)
          console.log(res.data.url)
          message.success(`${event.file.name} file uploaded successfully`)
          return res.data.url
        })
        .catch(e => console.log(e.message))
    }
  }

  useEffect(() => {
    if (!getCookie('token')) {
      history.push('/')
    }
    // eslint-disable-next-line no-useless-escape
  }, [])

  const handleCreateOrderClick = () => {
    setVisible(true)
  }

  const modalHandleOk = () => {
    setVisible(false)
  }
  const modalHandleCancel = () => {
    setVisible(false)
  }

  const content = (
    <div>
      <Button type="link" onClick={logOut}>
        Logout
      </Button>
    </div>
  )

  const handleSubmit = e => {
    e.preventDefault()
    console.log(props.currentCompany)
    const order = {
      points: points,
      take_address: takeAddress,
      deliver_address: deliverAddress,
      order_description: orderDescription,
      comment: comment,
      order_start_time: orderStartTime,
      order_end_time: orderEndTime,
    }

    const data = {
      companyId: props.currentCompany.id,
      order: order,
    }

    const url = 'https://thawing-ravine-80499.herokuapp.com/create-order'

    axios
      .post(url, data)
      .then(res => {
        setPoints('')
        setTakeAddress('')
        setDeliverAddress('')
        setOrderDescription('')
        setOrderStartTime('')
        setOrderEndTime('')
        console.log(res)
        setComment('')
      })
      .catch(e => console.log(e.message))
  }

  const handlePointsChange = useCallback(e => {
    const orderPoint = e.target.value
    setPoints(orderPoint)
    console.log(e.target.value)
  }, [])

  const handleTakeAddressChange = useCallback(e => {
    const orderTakeAddress = e.target.value
    setTakeAddress(orderTakeAddress)
    console.log(e.target.value)
  }, [])
  const handleDeliverAddressChange = useCallback(e => {
    const orderDeliverAddress = e.target.value
    setDeliverAddress(orderDeliverAddress)
    console.log(e.target.value)
  }, [])

  const handleOrderDescriptionChange = useCallback(e => {
    const orderDescriptionField = e.target.value
    setOrderDescription(orderDescriptionField)
    console.log(e.target.value)
  }, [])

  const handleOrderCommentChange = useCallback(e => {
    const orderCommentField = e.target.value
    setComment(orderCommentField)
    console.log(e.target.value)
  }, [])

  const onTimeChangeChange = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    setOrderStartTime(dateStrings[0])
    setOrderEndTime(dateStrings[1])
  }

  const { companies } = props
  const { signInLoading, signInAsCompanyData } = companies
  console.log(signInAsCompanyData)

  return (
    <>
      <Sider theme="light" width={300}>
        <div style={{ textAlign: 'center' }}>
          <Avatar
            shape="square"
            src={
              signInAsCompanyData.avatar
                ? signInAsCompanyData.avatar
                : company_avatar
            }
            size={128}
          />
          <Upload.Dragger
            showUploadList={false}
            multiple={false}
            onChange={e => handleImageChange(e)}
            customRequest={dummyRequest}
            accept=".jpg, .jpeg, .png">
            <Icon type="upload" /> Click to Upload
          </Upload.Dragger>
        </div>
        <div style={{ textAlign: 'center', padding: '.5rem 1.5rem' }}>
          <h2>Profile information</h2>
          {signInLoading ? (
            <Spinner />
          ) : (
            Object.keys(signInAsCompanyData).map(el => {
              return (
                <List key={el}>
                  <List.Item>
                    <strong>{`${el} :`}</strong>
                    <span
                      style={{
                        wordBreak: 'break-all',
                      }}>{` ${signInAsCompanyData[el]}`}</span>
                  </List.Item>
                </List>
              )
            })
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleCreateOrderClick}>Create order</Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">My orders</Menu.Item>
            <Menu.Item key="2">Active orders</Menu.Item>
            <Menu.Item key="3">Completed orders</Menu.Item>
          </Menu>
          <div>
            <Popover
              placement="bottomRight"
              content={content}
              title="Profile settings"
              trigger="click">
              <Avatar
                src={
                  signInAsCompanyData.avatar
                    ? signInAsCompanyData.avatar
                    : company_avatar
                }
              />
            </Popover>
          </div>
        </Header>
      </Layout>
      <Modal
        title="Create Request"
        visible={visible}
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}>
        <Form onSubmit={e => handleSubmit(e)} className="login-form">
          <Form.Item>
            <Title level={3}>Request options</Title>
          </Form.Item>
          <Form.Item>
            <Input
              onChange={e => handlePointsChange(e)}
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
          <Form.Item>
            <Input
              onChange={e => handleTakeAddressChange(e)}
              value={takeAddress}
              placeholder="Take address"
              prefix={
                <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
            />
          </Form.Item>
          <Form.Item>
            <Input
              onChange={e => handleDeliverAddressChange(e)}
              value={deliverAddress}
              placeholder="Deliver address"
              prefix={
                <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              onChange={e => handleOrderDescriptionChange(e)}
              value={orderDescription}
              placeholder="Order Description"
            />
          </Form.Item>
          <Form.Item>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                'This Month': [
                  moment().startOf('month'),
                  moment().endOf('month'),
                ],
              }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
              onChange={onTimeChangeChange}
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              onChange={e => handleOrderCommentChange(e)}
              value={comment}
              placeholder="Your comment"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button">
              Create order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  console.log(state)
  const { users, companies, signInAsCompany, signInAsUser } = state
  return {
    users,
    companies,
    signInAsCompany,
    signInAsUser,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signInAs: data => {
      dispatch(signInAs(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
