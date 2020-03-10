import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Layout } from 'antd'
import './profilePage.css'
import Storage from '../../services/localStorage/localStorage'
import company_avatar from '../../assets/images/company_avatar.png'
import Menu from 'antd/es/menu'

import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import {
  createCompanyThunk,
  getCompanyByIdThunk,
  removeCompanyByIdThunk,
} from '../../redux/thunk'
import {
  getCompanyOrdersThunk,
  createCompanyOrderThunk,
} from '../../redux/thunk/orders.thunks'
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

const { Header, Sider, Content } = Layout

const ProfilePage = ({
  companies,
  orders,
  deleteAccount,
  getCompanyById,
  createOrder,
  updateCompanyData,
  getCompanyAllOrders,
  gettingCompanyOrders,
  gettingAllOrders,
}) => {
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isInputsEditable, setIsInputsEditable] = useState(false)
  const { companyOrdersData } = orders
  useEffect(() => {
    const ls = Storage.get('deliver')
    const companyId = ls.id
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
  }

  const handleCancelEditInfoBtnClick = () => {
    setIsInputsEditable(false)
  }

  const handleSaveInfoBtnClick = data => {
    updateCompanyData(data)
    setIsInputsEditable(false)
  }

  const deleteCompanyAccount = id => {
    deleteAccount(id)
  }

  const { signInLoading, signInAsCompanyData } = companies

  const { id, avatar, amount } = signInAsCompanyData

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
                avatarUrl={avatar}
                companyDataUrl={signInAsCompanyData.avatar}
                default={company_avatar}
              />
            </div>
          </Header>
          <Content className="company_profile_main">
            <Route exact path="/company">
              <OrdersList
                companyId={id}
                orders={companyOrdersData}
                loading={gettingCompanyOrders}
              />
            </Route>
            <Route path="/company/active_orders">
              <OrdersList
                companyId={id}
                orders={companyOrdersData}
                loading={gettingCompanyOrders}
                filterBy="active"
              />
            </Route>
            <Route path="/company/completed_orders">
              <OrdersList
                companyId={id}
                orders={companyOrdersData}
                loading={gettingCompanyOrders}
                filterBy="done"
              />
            </Route>
            <Route path="/company/pending_orders">
              <OrdersList
                companyId={id}
                orders={companyOrdersData}
                loading={gettingCompanyOrders}
                filterBy="pending"
              />
            </Route>
            <Route path="/company/profile_info">
              <div className="company_profile_section_wrapper">
                <EditProfileInfo
                  handleCancelBtnClick={handleCancelEditInfoBtnClick}
                  handleSaveBtnClick={handleSaveInfoBtnClick}
                  handleEditBtnClick={handleEditInfoBtnClick}
                  state={signInAsCompanyData}
                  defaultUrl={company_avatar}
                  loading={signInLoading}
                  deleteAccount={deleteCompanyAccount}
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
  const { companies, orders } = state
  const { signInAsCompanyData, signInLoading } = companies
  const { gettingCompanyOrders } = orders
  return {
    signInAsCompanyData,
    signInLoading,
    companies,
    orders,
    gettingCompanyOrders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCompanyData: id => dispatch(createCompanyThunk(id)),
    getCompanyById: id => dispatch(getCompanyByIdThunk(id)),
    createOrder: data => dispatch(createCompanyOrderThunk(data)),
    getCompanyAllOrders: id => dispatch(getCompanyOrdersThunk(id)),
    deleteAccount: id => dispatch(removeCompanyByIdThunk(id)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
