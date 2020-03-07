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
import EditProfileInfo from '../../containers/editProfileInfo/editProfileInfo'
import logo from '../../assets/images/logo.svg'

import OrdersList from '../../components/ordersList/ordersList'
import LogoutPopover from '../../components/logoutPopover/logoutPopover'
import Wallet from '../../components/wallet/wallet'

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

  const [isInputsEditable, setIsInputsEditable] = useState(false)

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

  const handleEditInfoBtnClick = () => {
    setIsInputsEditable(true)
    setAvatarUrl(avatar)
  }

  const handleCancelEditInfoBtnClick = () => {
    setIsInputsEditable(false)
  }

  const handleSaveInfoBtnClick = () => {
    const data = {
      id,
      name: companyName,
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
    //   !isAddressValid &&
    //   !isActivityValid &&
    //   !isPhoneNumberValid &&
    //   !isTaxNumberValid
    // ) {
    //   setShowNameValidText(true)
    //   setShowAddressValidText(true)
    //   setShowPhoneNumValidText(true)
    //   setShowTaxNumValidText(true)
    //   setShowActivityValidText(true)
    // } else if (!isNameValid) {
    //   setShowNameValidText(true)
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
          <div className="profile_company_logo">
            <img src={logo} alt="deliver.me" />
          </div>
          <Menu
            theme="dark"
            className="sidebar_menu_wrapper"
            mode="inline"
            defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/company">
                <span className="menu_item_icon">
                  <img src={allOrdersIcon} alt="All orders" />
                </span>
                <span>My orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/company/active_orders">
                <span className="menu_item_icon">
                  <img src={activeOrdersIcon} alt="All orders" />
                </span>
                <span>Active orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/company/pending_orders">
                <span className="menu_item_icon">
                  <img src={pendingOrdersIcon} alt="All orders" />
                </span>
                <span>Pending orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/company/completed_orders">
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
              <Wallet wallet={amount} />
              <LogoutPopover
                companyDataUrl={signInAsCompanyData.avatar}
                avatarUrl={avatarUrl}
                default={company_avatar}
              />
            </div>
          </Header>
          <Content className="company_profile_main">
            <Route exact path="/company">
              <OrdersList
                orders={companyAllOrders}
                loading={getingCompanyAllOrders}
              />
            </Route>
            <Route path="/company/active_orders">
              <OrdersList
                orders={companyAllOrders}
                loading={getingCompanyAllOrders}
                filterBy="active"
              />
            </Route>
            <Route path="/company/completed_orders">
              <OrdersList
                orders={companyAllOrders}
                loading={getingCompanyAllOrders}
                filterBy="done"
              />
            </Route>
            <Route path="/company/pending_orders">
              <OrdersList
                orders={companyAllOrders}
                loading={getingCompanyAllOrders}
                filterBy="pending"
              />
            </Route>
            <Route path="/company/profile_info">
              <div className="company_profile_section_wrapper">
                <EditProfileInfo
                  handleCancelBtnClick={handleCancelEditInfoBtnClick}
                  handleSaveBtnClick={handleSaveInfoBtnClick}
                  handleEditBtnClick={handleEditInfoBtnClick}
                  id={id}
                  name={name}
                  taxNumber={taxNumber}
                  address={address}
                  phone={phone}
                  activity={activity}
                  avatar={avatar}
                  companyDataUrl={signInAsCompanyData.avatar}
                  avatarUrl={avatarUrl}
                  defaultUrl={company_avatar}
                  loading={signInLoading}
                  isInputsEditable={isInputsEditable}
                />
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
