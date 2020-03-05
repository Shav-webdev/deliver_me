import React, { useEffect, useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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
  Card,
  Collapse,
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
  createOrderThunk,
  createCompanyThunk,
  getCompanyByIdThunk,
  getCompanyAllOrdersThunk,
} from '../../redux/thunk'
import { getUsersFailure } from '../../redux/action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Title } = Typography
const { TextArea } = Input
const { RangePicker } = DatePicker
const { Panel } = Collapse

const { Header, Sider, Content } = Layout

const ProfilePage = ({
  companies,
  updateAvatar,
  getCompanyById,
  createOrder,
  getCompanyAllOrders,
  getingCompanyAllOrders,
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
  const [collapsed, setCollapsed] = useState(false)

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
    const companyId = getCookie('id')

    getCompanyById(companyId)
    getCompanyAllOrders(companyId)
    // eslint-disable-next-line no-useless-escape
  }, [])

  const handleCreateOrderClick = () => {
    setVisible(true)
  }

  const modalHandleCancel = () => {
    setVisible(false)
  }
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const content = (
    <div>
      <p>
        <Link style={{ padding: '0 15px' }} to="/profile/company/profile_info">
          Profile information
        </Link>
      </p>
      <p>
        <Button type="link" onClick={logOut}>
          Logout
        </Button>
      </p>
    </div>
  )

  const handleSubmit = () => {
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
    console.log(data)

    createOrder(data)
    setVisible(false)
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

  const { signInLoading, signInAsCompanyData, companyAllOrders } = companies

  const {
    id,
    name,
    taxNumber,
    address,
    phone,
    email,
    approved,
    amount,
  } = signInAsCompanyData

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">Deliver.me</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
              lineHeight: '64px',
              minHeight: '100vh',
              backgroundImage:
                'linear-gradient(rgb(36, 77, 125), rgb(89, 36, 36)',
            }}>
            <Menu.Item key="1">
              <Link to="/profile/company/" />
              <span>My orders</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/profile/company/active_orders" />
              <span>Active orders</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/profile/company/completed_orders" />
              <span>Completed orders</span>
            </Menu.Item>
            <Menu.Item key="4"></Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background company_profile_header">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggle,
              }
            )}

            <div
              style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Button type="primary" onClick={handleCreateOrderClick}>
                Create order
              </Button>
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
          <Content className="company_profile_main">
            <Route exact path="/profile/company/">
              <List className="company_orders_list_wrapper" style={{}}>
                {getingCompanyAllOrders ? (
                  <Spinner />
                ) : (
                  companyAllOrders.map(el => {
                    return (
                      <List.Item className="orders_list_item" key={el.id}>
                        <div>
                          <p>
                            <strong>Order :</strong>
                            {el.order_description}
                          </p>
                          <p>
                            <strong>Money :</strong>
                            {el.points}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Take address :</strong>
                            {el.take_address}
                          </p>
                          <p>
                            <strong>Deliver address :</strong>
                            {el.deliver_address}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Status :</strong>
                            {el.state}
                          </p>
                        </div>
                      </List.Item>
                    )
                  })
                )}
              </List>
            </Route>

            <Route path="/profile/company/active_orders"> </Route>
            <Route path="/profile/company/completed_orders"> </Route>
            <Route path="/profile/company/profile_info">
              <div className="company_profile_section_wrapper">
                {signInLoading ? (
                  <Spinner />
                ) : (
                  <Form
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                      maxWidth: 700,
                      width: '100%',
                    }}>
                    <Form.Item label="Name">
                      <Input disabled value={name} />
                    </Form.Item>
                    <Form.Item label="E-mail">
                      <Input disabled value={email} />
                    </Form.Item>
                    <Form.Item label="Status">
                      <Input disabled value={approved} />
                    </Form.Item>
                    <Form.Item label="Amount">
                      <Input disabled value={amount} />
                    </Form.Item>

                    <Form.Item label="Address">
                      <Input disabled value={address} />
                    </Form.Item>
                    <Form.Item label="Phone Number">
                      <Input disabled value={phone} />
                    </Form.Item>
                    <Form.Item label="Tax Number">
                      <Input disabled value={taxNumber} />
                    </Form.Item>
                  </Form>
                )}
                <Avatar
                  size={128}
                  src={
                    signInAsCompanyData.avatar
                      ? signInAsCompanyData.avatar
                      : company_avatar
                  }
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Upload.Dragger
                  showUploadList={false}
                  multiple={false}
                  onChange={e => handleImageChange(e)}
                  customRequest={dummyRequest}
                  accept=".jpg, .jpeg, .png">
                  <Icon type="upload" /> Click to Upload
                </Upload.Dragger>
              </div>
            </Route>
          </Content>
        </Layout>
        <Modal
          title="Create Request"
          visible={visible}
          okText="Create order"
          onOk={handleSubmit}
          onCancel={modalHandleCancel}>
          <Form className="login-form">
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
                  <Icon
                    type="environment"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
              />
            </Form.Item>
            <Form.Item>
              <Input
                onChange={e => handleDeliverAddressChange(e)}
                value={deliverAddress}
                placeholder="Deliver address"
                prefix={
                  <Icon
                    type="environment"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
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
                format="LLL"
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
          </Form>
        </Modal>
      </Layout>
    </Router>
  )
}

const mapStateToProps = state => {
  console.log(state)
  const { users, companies } = state
  return {
    users,
    companies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCompanyById: id => dispatch(getCompanyByIdThunk(id)),
    createOrder: data => dispatch(createOrderThunk(data)),
    getCompanyAllOrders: id => dispatch(getCompanyAllOrdersThunk(id)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
