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
}) => {
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isInputsEditable, setIsInputsEditable] = useState(false)
const audio= new Audio()
  useEffect(() => {
    const ls = Storage.get('deliver')
    const companyId = ls.id
    getCompanyById(companyId)
    getCompanyOrders(companyId, 'all')
    getCompanyOrders(companyId, 'active')
    getCompanyOrders(companyId, 'pending')
    getCompanyOrders(companyId, 'done')
    // eslint-disable-next-line no-useless-escape
  }, [])

  useEffect(() => {
    socket.on('user_took_order', data => {
      console.log(data)
      audio.src = audioSound
      audio.play()
    })
  },[])

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

  // const handleMenuClick = e => {
  //   const type = e.key
  //   getCompanyOrders(id, type)
  // }

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
                <span>
                  <Badge
                    className="company_borders_badge"
                    count={companyOrdersData.length}
                  />
                </span>
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
                companyId={id}
                orders={companyOrdersData}
                loading={gettingCompanyOrders}
              />
            </Route>
            <Route path="/company/active_orders">
              <OrdersList
                companyId={id}
                orders={companyActiveOrdersData}
                loading={gettingCompanyActiveOrders}
              />
            </Route>
            <Route path="/company/completed_orders">
              <OrdersList
                companyId={id}
                orders={companyDoneOrdersData}
                loading={gettingCompanyDoneOrders}
              />
            </Route>
            <Route path="/company/pending_orders">
              <OrdersList
                companyId={id}
                orders={companyPendingOrdersData}
                loading={gettingCompanyPendingOrders}
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
  const {
    gettingCompanyOrders,
    gettingCompanyActiveOrders,
    gettingCompanyPendingOrders,
    gettingCompanyDoneOrders,
    companyOrdersData,
    companyActiveOrdersData,
    companyPendingOrdersData,
    companyDoneOrdersData,
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCompanyData: id => dispatch(createCompanyThunk(id)),
    getCompanyById: id => dispatch(getCompanyByIdThunk(id)),
    createOrder: data => dispatch(createCompanyOrderThunk(data)),
    getCompanyOrders: (id, type) => dispatch(getCompanyOrdersThunk(id, type)),
    deleteAccount: id => dispatch(removeCompanyByIdThunk(id)),
    updateAvatar: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
