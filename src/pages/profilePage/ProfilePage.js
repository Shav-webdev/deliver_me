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
import activeOrdersIcon from '../../assets/images/activeOrdersIcon.svg'
import allOrdersIcon from '../../assets/images/allOrdersIcon.svg'
import doneOrdersIcon from '../../assets/images/doneOrdersIcon.svg'
import pendingOrdersIcon from '../../assets/images/pendingOrdersIcon.svg'

import logo from '../../assets/images/logo.svg'
import {
  validateEmail,
  validateName,
  validateAddress,
  validatePhoneNumber,
  validateTaxNumber,
  validateActivity,
} from '../../pages/registration/helpers/validations'

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
  updateCompanyData,
  getCompanyAllOrders,
  getingCompanyAllOrders,
}) => {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyTaxNumber, setCompanyTaxNumber] = useState('')
  const [companyActivity, setCompanyActivity] = useState('')
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
  const [isEmailValid, setIsEmailValid] = useState(null)
  const [isNameValid, setIsNameValid] = useState(null)
  const [isAddressValid, setIsAddressValid] = useState(null)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(null)
  const [isTaxNumberValid, setIsTaxNumberValid] = useState(null)
  const [isActivityValid, setIsActivityValid] = useState(null)
  const [showEmailValidText, setShowEmailValidText] = useState(false)
  const [showNameValidText, setShowNameValidText] = useState(false)
  const [showAddressValidText, setShowAddressValidText] = useState(false)
  const [showPhoneNumValidText, setShowPhoneNumValidText] = useState(false)
  const [showTaxNumValidText, setShowTaxNumValidText] = useState(false)
  const [showActivityValidText, setShowActivityValidText] = useState(false)
  const [isInputsEditable, setIsInputsEditable] = useState(false)

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
          console.log(res.data.url)
          setAvatarUrl(res.data.url)

          console.log(avatarUrl)
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

  useEffect(() => {}, [avatarUrl])

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

  const handleCreateOrderSubmit = () => {
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

  const handleEmailChange = useCallback(e => {
    const email = e.target.value
    setCompanyEmail(email)
    setShowEmailValidText(false)
  }, [])

  const onHandleEmailValidate = () => {
    if (validateEmail(companyEmail)) {
      setIsEmailValid(true)
      setShowEmailValidText(false)
    } else {
      setIsEmailValid(false)
      setShowEmailValidText(true)
    }
  }

  const handleNameChange = useCallback(e => {
    const name = e.target.value
    setCompanyName(name)
    setShowNameValidText(false)
  }, [])

  const onHandleNameValidate = () => {
    if (validateName(companyName)) {
      setIsNameValid(true)
      setShowNameValidText(false)
    } else {
      setIsNameValid(false)
      setShowNameValidText(true)
    }
  }

  const handleAddressChange = useCallback(e => {
    const address = e.target.value
    setCompanyAddress(address)
    setShowAddressValidText(false)
  }, [])

  const onHandleAddressValidate = () => {
    if (validateAddress(companyAddress)) {
      setIsAddressValid(true)
      setShowAddressValidText(false)
    } else {
      setIsAddressValid(false)
      setShowAddressValidText(true)
    }
  }

  const handlePhoneNumChange = useCallback(e => {
    let number = e.target.value
    setPhoneNumber(number)
    setShowPhoneNumValidText(false)
  }, [])

  const onHandlePhoneNumValidate = () => {
    if (validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumberValid(true)
      setShowPhoneNumValidText(false)
    } else {
      setIsPhoneNumberValid(false)
      setShowPhoneNumValidText(true)
    }
  }

  const handleTaxNumChange = useCallback(e => {
    let number = e.target.value
    setCompanyTaxNumber(number)
    setShowTaxNumValidText(false)
  }, [])

  const onHandleTaxNumValidate = () => {
    if (validateTaxNumber(companyTaxNumber)) {
      setIsTaxNumberValid(true)
      setShowTaxNumValidText(false)
    } else {
      setIsTaxNumberValid(false)
      setShowTaxNumValidText(true)
    }
  }

  const handleActivityChange = useCallback(e => {
    let activityValue = e.target.value
    setCompanyActivity(activityValue)
    setShowActivityValidText(false)
  }, [])

  const onHandleActivityValidate = () => {
    if (validateActivity(companyActivity)) {
      setIsActivityValid(true)
      setShowActivityValidText(false)
    } else {
      setIsActivityValid(false)
      setShowActivityValidText(true)
    }
  }

  const handleEditInfoBtnClick = () => {
    setIsInputsEditable(true)

    setCompanyName(name)
    setCompanyTaxNumber(taxNumber)
    setCompanyAddress(address)
    setCompanyEmail(email)
    setCompanyActivity(activity)
    setPhoneNumber(phone)
    setAvatarUrl(avatar)

    // setTimeout(() => {
    //   onHandleNameValidate()
    //   onHandlePhoneNumValidate()
    //   onHandleTaxNumValidate()
    //   onHandleAddressValidate()
    //   onHandleEmailValidate()
    //   onHandleActivityValidate()
    // }, 2000)
  }

  const handleCancelEditInfoBtnClick = () => {
    setIsInputsEditable(false)
  }

  const handleSaveInfoBtnClick = () => {
    const data = {
      id,
      name: companyName,
      email: companyEmail,
      address: companyAddress,
      phone: phoneNumber,
      taxNumber: companyTaxNumber,
      activity: companyActivity,
      avatar: avatarUrl,
    }

    updateCompanyData(data)
    setIsInputsEditable(false)

    // if (
    //   !isNameValid &&
    //   !isEmailValid &&
    //   !isAddressValid &&
    //   !isActivityValid &&
    //   !isPhoneNumberValid &&
    //   !isTaxNumberValid
    // ) {
    //   setShowNameValidText(true)
    //   setShowEmailValidText(true)
    //   setShowAddressValidText(true)
    //   setShowPhoneNumValidText(true)
    //   setShowTaxNumValidText(true)
    //   setShowActivityValidText(true)
    // } else if (!isNameValid) {
    //   setShowNameValidText(true)
    // } else if (!isEmailValid) {
    //   setShowEmailValidText(true)
    // } else if (!isAddressValid) {
    //   setShowAddressValidText(true)
    // } else if (!isPhoneNumberValid) {
    //   setShowPhoneNumValidText(true)
    // } else if (!isTaxNumberValid) {
    //   setShowTaxNumValidText(true)
    // } else if (!isActivityValid) {
    //   setShowActivityValidText(true)
    // } else {
    //   updateCompanyData(data)
    //   setIsInputsEditable(false)
    // }
  }

  const { signInLoading, signInAsCompanyData, companyAllOrders } = companies

  const {
    id,
    name,
    taxNumber,
    address,
    phone,
    email,
    activity,
    avatar,
    approved,
    amount,
  } = signInAsCompanyData

  return (
    <Router>
      <Layout>
        <Sider
          className="theme_bg_color"
          trigger={null}
          collapsible
          collapsed={collapsed}>
          <div className="logo">
            <img src={logo} alt="deliver.me" />
          </div>
          <Menu
            theme="dark"
            className="sidebar_menu_wrapper"
            mode="inline"
            defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/profile/company/">
                <span className="menu_item_icon">
                  <img src={allOrdersIcon} alt="All orders" />
                </span>
                <span>My orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/profile/company/active_orders">
                <span className="menu_item_icon">
                  <img src={activeOrdersIcon} alt="All orders" />
                </span>
                <span>Active orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/profile/company/pending_orders">
                <span className="menu_item_icon">
                  <img src={pendingOrdersIcon} alt="All orders" />
                </span>
                <span>Pending orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/profile/company/completed_orders">
                <span className="menu_item_icon">
                  <img src={doneOrdersIcon} alt="Completed orders" />
                </span>
                <span>Completed orders</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background company_profile_header">
            <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'company_profile_trigger',
                  onClick: toggle,
                }
              )}
            </div>
            <div className="header_btns_wrapper">
              <Button type="primary" onClick={handleCreateOrderClick}>
                Create order
              </Button>
              <Popover
                placement="bottomRight"
                content={content}
                title="Profile settings"
                trigger="click">
                <Avatar
                  size="large"
                  src={
                    avatarUrl
                      ? avatarUrl
                      : signInAsCompanyData.avatar
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
            <Route path="/profile/company/active_orders">
              <List className="company_orders_list_wrapper" style={{}}>
                {getingCompanyAllOrders ? (
                  <Spinner />
                ) : (
                  companyAllOrders
                    .filter(el => el.state === 'active')
                    .map(el => {
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
            <Route path="/profile/company/completed_orders">
              <List className="company_orders_list_wrapper" style={{}}>
                {getingCompanyAllOrders ? (
                  <Spinner />
                ) : (
                  companyAllOrders
                    .filter(el => el.state === 'done')
                    .map(el => {
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
            <Route path="/profile/company/pending_orders">
              <List className="company_orders_list_wrapper" style={{}}>
                {getingCompanyAllOrders ? (
                  <Spinner />
                ) : (
                  companyAllOrders
                    .filter(el => el.state === 'pending')
                    .map(el => {
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
            <Route path="/profile/company/profile_info">
              <div className="company_profile_section_wrapper">
                {signInLoading ? (
                  <Spinner />
                ) : (
                  <Form className="company_info_form">
                    <div className="company_change_avatar_section">
                      <div>
                        <Avatar
                          size={128}
                          src={
                            avatarUrl
                              ? avatarUrl
                              : signInAsCompanyData.avatar
                              ? signInAsCompanyData.avatar
                              : company_avatar
                          }
                        />
                      </div>
                      <div className="company_upload_avatar_wrapper">
                        <Upload.Dragger
                          showUploadList={false}
                          multiple={false}
                          disabled={!isInputsEditable}
                          onChange={e => handleImageChange(e)}
                          customRequest={dummyRequest}
                          accept=".jpg, .jpeg, .png, .svg">
                          <Icon type="upload" /> Change avatar
                        </Upload.Dragger>
                      </div>
                    </div>
                    <Form.Item
                      label="Name"
                      validateStatus={showNameValidText ? 'error' : 'success'}
                      hasFeedback={showNameValidText}
                      help={
                        showNameValidText
                          ? 'Name should contain at least two characters'
                          : ''
                      }>
                      <Input
                        disabled={!isInputsEditable}
                        onChange={handleNameChange}
                        value={isInputsEditable ? companyName : name}
                      />
                    </Form.Item>
                    <Form.Item
                      label="E-mail"
                      validateStatus={showEmailValidText ? 'error' : 'success'}
                      hasFeedback={showEmailValidText}
                      help={
                        showEmailValidText
                          ? 'The input is not valid E-mail!'
                          : ''
                      }>
                      <Input
                        disabled={!isInputsEditable}
                        onChange={e => handleEmailChange(e)}
                        value={isInputsEditable ? companyEmail : email}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Address"
                      validateStatus={
                        showAddressValidText ? 'error' : 'success'
                      }
                      hasFeedback={showAddressValidText}
                      help={
                        showAddressValidText
                          ? 'Address should contain at least two characters'
                          : ''
                      }>
                      <Input
                        disabled={!isInputsEditable}
                        onChange={e => handleAddressChange(e)}
                        value={isInputsEditable ? companyAddress : address}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Phone Number"
                      validateStatus={
                        showPhoneNumValidText ? 'error' : 'success'
                      }
                      hasFeedback={showPhoneNumValidText}
                      help={
                        showPhoneNumValidText
                          ? 'Phone number should contain only 8 digit either ( e.g "12345678" or "12-345-678")'
                          : ''
                      }>
                      <Input
                        disabled={!isInputsEditable}
                        onChange={e => handlePhoneNumChange(e)}
                        value={isInputsEditable ? phoneNumber : phone}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Tax Number"
                      validateStatus={showTaxNumValidText ? 'error' : 'success'}
                      hasFeedback={showTaxNumValidText}
                      help={
                        showTaxNumValidText
                          ? 'Tax number should contain only 8 digit either'
                          : ''
                      }>
                      <Input
                        disabled={!isInputsEditable}
                        onChange={e => handleTaxNumChange(e)}
                        value={isInputsEditable ? companyTaxNumber : taxNumber}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Activity"
                      validateStatus={
                        showActivityValidText ? 'error' : 'success'
                      }
                      hasFeedback={showActivityValidText}
                      help={
                        showActivityValidText
                          ? 'Activity should contain at least two characters'
                          : ''
                      }>
                      <Input
                        disabled={!isInputsEditable}
                        onChange={e => handleActivityChange(e)}
                        value={isInputsEditable ? companyActivity : activity}
                      />
                    </Form.Item>
                    <div className="company_edit_info_profile">
                      {!isInputsEditable && (
                        <Button type="primary" onClick={handleEditInfoBtnClick}>
                          Edit
                        </Button>
                      )}
                      {isInputsEditable && (
                        <Button
                          type="primary"
                          onClick={handleCancelEditInfoBtnClick}>
                          Cancel
                        </Button>
                      )}

                      <Button type="primary" onClick={handleSaveInfoBtnClick}>
                        Save
                      </Button>
                    </div>
                  </Form>
                )}
              </div>
            </Route>
          </Content>
        </Layout>
        <Modal
          title="Create Request"
          style={{ top: 20 }}
          visible={visible}
          okText="Create order"
          onOk={handleCreateOrderSubmit}
          onCancel={modalHandleCancel}>
          <Form className="login-form">
            <Form.Item label="Point">
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
            <Form.Item label="Take address">
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
            <Form.Item label="Deliver address">
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
            <Form.Item label="Description">
              <TextArea
                onChange={e => handleOrderDescriptionChange(e)}
                value={orderDescription}
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item label="Order time range">
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
            <Form.Item label="Comment">
              <TextArea
                onChange={e => handleOrderCommentChange(e)}
                value={comment}
                placeholder="Comment"
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
    updateCompanyData: id => dispatch(createCompanyThunk(id)),
    getCompanyById: id => dispatch(getCompanyByIdThunk(id)),
    createOrder: data => dispatch(createOrderThunk(data)),
    getCompanyAllOrders: id => dispatch(getCompanyAllOrdersThunk(id)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
