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
import List from 'antd/es/list'
import company_avatar from '../../assets/images/company_avatar.png'
import axios from 'axios'
import Popover from 'antd/es/popover'
import { logOut } from '../registration/services/services'
import Modal from 'antd/es/modal'
import Menu from 'antd/es/menu'
import moment from 'moment'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import {
  createOrder,
  createCompanyThunk,
  getCompanyById,
  getCompanyByIdThunk,
} from '../../redux/thunk'
import { getUsersFailure } from '../../redux/action'

const { Title } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker

const { Header, Sider } = Layout

const ProfilePage = ({
  createOrder,
  companies,
  updateAvatar,
  getCompanyById,
}) => {
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
          console.log({
            ...companies.signInAsCompanyData,
            avatar: res.data.url,
          })
          updateAvatar({
            ...companies.signInAsCompanyData,
            avatar: res.data.url,
          })
          return res.data.url
        })
        .catch(e => console.log(e.message))
    }
  }

  useEffect(() => {
    if (!getCookie('token') && !getCookie('id')) {
      history.push('/')
    }

    getCompanyById(getCookie('id'))
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
    const data = {
      companyId: companies.signInAsCompanyData.id,
      order: {
        points: points,
        take_address: takeAddress,
        deliver_address: deliverAddress,
        order_description: orderDescription,
        comment: comment,
        order_start_time: orderStartTime,
        order_end_time: orderEndTime,
      },
    }
  }

  const handlePointsChange = useCallback(e => {
    const orderPoint = e.target.value
    setPoints(orderPoint)
  }, [])

  const handleTakeAddressChange = useCallback(e => {
    const orderTakeAddress = e.target.value
    setTakeAddress(orderTakeAddress)
  }, [])
  const handleDeliverAddressChange = useCallback(e => {
    const orderDeliverAddress = e.target.value
    setDeliverAddress(orderDeliverAddress)
  }, [])

  const handleOrderDescriptionChange = useCallback(e => {
    const orderDescriptionField = e.target.value
    setOrderDescription(orderDescriptionField)
  }, [])

  const handleOrderCommentChange = useCallback(e => {
    const orderCommentField = e.target.value
    setComment(orderCommentField)
  }, [])

  const onTimeChangeChange = (dates, dateStrings) => {
    setOrderStartTime(dateStrings[0])
    setOrderEndTime(dateStrings[1])
  }

  const { signInLoading, signInAsCompanyData } = companies

  const { id, name, taxNumber, address, phone, email } = signInAsCompanyData

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
            <List key={id}>
              <List.Item>
                <strong>Name:</strong>
                <span>{`${name}`}</span>
              </List.Item>
              <List.Item>
                <strong>Address:</strong>
                <span>{`${address}`}</span>
              </List.Item>
              <List.Item>
                <strong>Tax Number:</strong>
                <span>{`${taxNumber}`}</span>
              </List.Item>
              <List.Item>
                <strong>Phone number:</strong>
                <span>{`${phone}`}</span>
              </List.Item>
              <List.Item>
                <strong>Email:</strong>
                <span>{`${email}`}</span>
              </List.Item>
            </List>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={handleCreateOrderClick}>
            Create order
          </Button>
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
  const { users, companies } = state
  return {
    users,
    companies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCompanyById: id => dispatch(getCompanyByIdThunk(id)),
    createOrder: data => dispatch(createOrder(data)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
