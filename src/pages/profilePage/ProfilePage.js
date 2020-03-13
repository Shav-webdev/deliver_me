import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Layout } from 'antd'
import './profilePage.css'
import Storage from '../../services/localStorage/localStorage'
import company_avatar from '../../assets/images/company_avatar.png'
import Menu from 'antd/es/menu'
import { Badge } from 'antd'
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
import { socket } from '../../services/socket'
import audioSound from '../../assets/sound.mp3'
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
import { getLastOrderIndex } from '../../services/util'

const { Header, Sider, Content } = Layout

const ProfilePage = ({
  companies,
  orders,
  deleteAccount,
  getCompanyById,
  createOrder,
  updateCompanyData,
  getCompanyOrders,
  gettingCompanyOrders,
  gettingCompanyActiveOrders,
  gettingCompanyPendingOrders,
  gettingCompanyDoneOrders,
  companyOrdersData,
  companyActiveOrdersData,
  companyPendingOrdersData,
  companyDoneOrdersData,
  hasMoreDoneOrder,
  hasMoreActiveOrder,
  hasMoreAllOrder,
  hasMorePendingOrder,
}) => {
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isInputsEditable, setIsInputsEditable] = useState(false)
  const [ordersDefaultCount, setOrdersDefaultCount] = useState(5)

  // const audio = new Audio()
  useEffect(() => {
    const ls = Storage.get('deliver')
    const companyId = ls.id
    const firstCreatedTime = Number(Date.now())
    getCompanyById(companyId)
    getCompanyOrders(companyId, 'all', firstCreatedTime, ordersDefaultCount)
    getCompanyOrders(companyId, 'active', firstCreatedTime, ordersDefaultCount)
    getCompanyOrders(companyId, 'pending', firstCreatedTime, ordersDefaultCount)
    getCompanyOrders(companyId, 'done', firstCreatedTime, ordersDefaultCount)
    // eslint-disable-next-line no-useless-escape
  }, [])

  useEffect(() => {
    socket.on('user_took_order', data => {
      console.log(data)
      audio.src = audioSound
      audio.autoplay = true
      audio.play()
    })
  }, [])

  const handleCreateOrderClick = () => {
    setVisible(true)
  }

  const orderModalHandleCancel = () => {
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

  const handleChangePassBtnClick = data => {
    const passData = {
      id: companies.signInAsCompanyData.id,
      ...data,
    }
    updateCompanyData(passData)
  }

  const { signInLoading, signInAsCompanyData } = companies

  const { id, avatar, amount } = signInAsCompanyData

  const getMoreData = (state, createdTime) => {
    if (state === 'all') {
      console.log('all index', createdTime)
      getCompanyOrders(id, state, createdTime, ordersDefaultCount)
    } else if (state === 'active') {
      console.log('active index', createdTime)
      getCompanyOrders(id, state, createdTime, ordersDefaultCount)
    } else if (state === 'pending') {
      console.log('pending last id', createdTime)
      getCompanyOrders(id, state, createdTime, ordersDefaultCount)
    } else if (state === 'done') {
      console.log('done index', createdTime)
      getCompanyOrders(id, state, createdTime, ordersDefaultCount)
    }
  }

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
            // onClick={handleMenuClick}
            theme="dark"
            className="sidebar_menu_wrapper"
            mode="inline"
            defaultSelectedKeys={['1']}>
            <Menu.Item key="all">
              <Link to="/company">
                <span className="menu_item_icon">
                  <img src={allOrdersIcon} alt="All orders" />
                </span>
                <span className="order_text">My orders</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="active">
              <Link to="/company/active_orders">
                <span className="menu_item_icon">
                  <img src={activeOrdersIcon} alt="All orders" />
                </span>
                <span className="order_text">Active orders</span>
                <span>
                  <Badge
                    className="company_borders_badge"
                    count={companyActiveOrdersData.length}
                  />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="pending">
              <Link to="/company/pending_orders">
                <span className="menu_item_icon">
                  <img src={pendingOrdersIcon} alt="All orders" />
                </span>
                <span className="order_text">Pending orders</span>
                <span>
                  <Badge
                    className="company_borders_badge"
                    count={companyPendingOrdersData.length}
                  />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="done">
              <Link to="/company/completed_orders">
                <span className="menu_item_icon">
                  <img src={doneOrdersIcon} alt="Completed orders" />
                </span>
                <span className="order_text">Completed orders</span>
                <span>
                  <Badge
                    className="company_borders_badge"
                    count={companyDoneOrdersData.length}
                  />
                </span>
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
                hasMoreOrder={hasMoreAllOrder}
                state="all"
                companyId={id}
                orders={companyOrdersData}
                loading={gettingCompanyOrders}
                getMoreData={getMoreData}
              />
            </Route>
            <Route path="/company/active_orders">
              <OrdersList
                hasMoreOrder={hasMoreActiveOrder}
                state="active"
                companyId={id}
                orders={companyActiveOrdersData}
                loading={gettingCompanyActiveOrders}
                getMoreData={getMoreData}
              />
            </Route>
            <Route path="/company/completed_orders">
              <OrdersList
                hasMoreOrder={hasMoreDoneOrder}
                state="done"
                companyId={id}
                orders={companyDoneOrdersData}
                loading={gettingCompanyDoneOrders}
                getMoreData={getMoreData}
              />
            </Route>
            <Route path="/company/pending_orders">
              <OrdersList
                hasMoreOrder={hasMorePendingOrder}
                state="pending"
                companyId={id}
                orders={companyPendingOrdersData}
                loading={gettingCompanyPendingOrders}
                getMoreData={getMoreData}
              />
            </Route>
            <Route path="/company/profile_info">
              <div className="company_profile_section_wrapper">
                <EditProfileInfo
                  handleCancelBtnClick={handleCancelEditInfoBtnClick}
                  handleSaveBtnClick={handleSaveInfoBtnClick}
                  handleEditBtnClick={handleEditInfoBtnClick}
                  handleChangePassBtnClick={handleChangePassBtnClick}
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
          orderModalHandleCancel={orderModalHandleCancel}
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
  console.log(state)
  const {
    gettingCompanyOrders,
    gettingCompanyActiveOrders,
    gettingCompanyPendingOrders,
    gettingCompanyDoneOrders,
    companyOrdersData,
    companyActiveOrdersData,
    companyPendingOrdersData,
    companyDoneOrdersData,
    hasMoreDoneOrder,
    hasMoreActiveOrder,
    hasMoreAllOrder,
    hasMorePendingOrder,
  } = orders

  return {
    signInAsCompanyData,
    signInLoading,
    companies,
    orders,
    gettingCompanyOrders,
    gettingCompanyActiveOrders,
    gettingCompanyPendingOrders,
    gettingCompanyDoneOrders,
    companyOrdersData,
    companyActiveOrdersData,
    companyPendingOrdersData,
    companyDoneOrdersData,
    hasMoreDoneOrder,
    hasMoreActiveOrder,
    hasMoreAllOrder,
    hasMorePendingOrder,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCompanyData: id => dispatch(createCompanyThunk(id)),
    getCompanyById: id => dispatch(getCompanyByIdThunk(id)),
    createOrder: data => dispatch(createCompanyOrderThunk(data)),
    getCompanyOrders: (id, type, last, count) =>
      dispatch(getCompanyOrdersThunk(id, type, last, count)),
    deleteAccount: id => dispatch(removeCompanyByIdThunk(id)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
