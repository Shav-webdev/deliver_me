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
import Menu from 'antd/es/menu'

import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import { createCompanyThunk, getCompanyByIdThunk } from '../../redux/thunk'
import {
  getCompanyOrdersThunk,
  createCompanyOrderThunk,
  removeCompanyOrderThunk,
} from '../../redux/thunk/orders.thunks'
import { getUsersFailure } from '../../redux/action'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import activeOrdersIcon from '../../assets/images/activeOrdersIcon.svg'
import allOrdersIcon from '../../assets/images/allOrdersIcon.svg'
import doneOrdersIcon from '../../assets/images/doneOrdersIcon.svg'
import pendingOrdersIcon from '../../assets/images/pendingOrdersIcon.svg'
import EditProfileInfo from '../../containers/editProfileInfo/editProfileInfo'
import logo from '../../assets/images/logo.svg'
import Wallet from '../../components/wallet/wallet'
import LogoutPopover from '../../components/logoutPopover/logoutPopover'
import OrdersList from '../../components/ordersList/ordersList'
import CreateOrderModal from '../../components/createOrderModal/createOrderModal'

const { Title } = Typography
const { Panel } = Collapse

const { Header, Sider, Content } = Layout

const ProfilePage = ({
  companies,
  orders,
  updateAvatar,
  getCompanyById,
  createOrder,
  updateCompanyData,
  getCompanyAllOrders,
}) => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [visible, setVisible] = useState(false)
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

  const handleCreateOrderSubmit = order => {
    const data = order.id
      ? order
      : {
          companyId: companies.signInAsCompanyData.id,
          order,
        }
    createOrder(data)
    setVisible(false)
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

  const {
    signInLoading,
    signInAsCompanyData,
    companyAllOrders,
    getingCompanyAllOrders,
  } = companies

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
        <CreateOrderModal
          visible={visible}
          handleCreateOrderSubmit={handleCreateOrderSubmit}
          modalHandleCancel={modalHandleCancel}
          modalTitle="Create Request"
          okText="Create"
          state={{}}
        />
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
    createOrder: data => dispatch(createCompanyOrderThunk(data)),
    getCompanyAllOrders: id => dispatch(getCompanyOrdersThunk(id)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
