import React, { useState, useEffect } from 'react'
import { Table, Typography, Popover, Avatar, Rate, Card } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  ExportOutlined,
  CreditCardOutlined,
} from '@ant-design/icons'
import logo from '../../assets/images/logo.svg'
import allOrdersIcon from '../../assets/images/allOrdersIcon.svg'
import doneOrdersIcon from '../../assets/images/doneOrdersIcon.svg'
import pendingOrdersIcon from '../../assets/images/pendingOrdersIcon.svg'
import Storage from '../../services/localStorage/localStorage'
import { Layout, Menu, Icon } from 'antd'
import Spinner from '../../components/spiner/spinner'
import Wallet from '../../components/wallet/wallet'
import { connect } from 'react-redux'
import './userProfile.css'
import {
  createUserThunk,
  getUserOrdersThunk,
  getAllOrdersThunk,
  getUserByIdThunk,
  updateOrderByUserThunk
} from '../../redux/thunk'
import history from '../../routes/history'
import { successMessage, logOut } from '../../services/services'
import UserPopover from '../../components/userPopoverLogout/userPopover'
import EditProfileInfo from '../../containers/editProfileInfo/editProfileInfo'
import CardUser from '../../components/cardForUser/CardUser'

const { Header, Sider, Content } = Layout
const { Column } = Table
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']
const defaultState = {
  collapsed: false,
  isUpdated: false,
  search: '',
}

const userProfilePage = ({
  orders,
  getActiveOrders,
  getUserPendOrders,
  getUserDoneOrders,
  getUser,
  currentUserData,
  updateUser,
  doneOrder,
  takeOrder
}) => {
  const { gettingUserOrders,gettingAllOrders,gettingCompanyPendingOrders,gettingCompanyDoneOrders, allOrdersData,companyPendingOrdersData,companyDoneOrdersData } = orders
  const [isInputsEditable, setIsInputsEditable] = useState(false)
  const { amount, name, lastName, phone, address, avatar ,rating} = currentUserData
  const [state, setState] = useState(defaultState)
  const [menuItem, setMenuItem] = useState('a_orders')

  useEffect(() => {
    const ls = Storage.get('deliver')
    const id = ls ? ls.id : ''
    getUserPendOrders(id)
    getUserDoneOrders(id)
    getUser(id)
    getActiveOrders()
  }, [])

  const handleEditInfoBtnClick = () => {
    setIsInputsEditable(true)
  }
  const handleSaveInfoBtnClick = data => {
    updateUser(data)
    getUser(data.id)
    setMenuItem('a_orders')
    setIsInputsEditable(false)
  }
  const handleCancelEditInfoBtnClick = () => {
    setIsInputsEditable(false)
  }
  const onMenuSelect = e => {
    console.log(e.key)
    setMenuItem(e.key)
  }

  const toggle = () => {
    setState({
      ...state,
      collapsed: !state.collapsed,
    })
  }

  return (
    <div>
      <Layout style={{ minWidth: '700px' }}>
        <Sider
          trigger={null}
          style={{ minHeight: '100vh' }}
          collapsible
          collapsed={state.collapsed}>
          <div className="logo_user">
            <img src={logo} style={{ width: '90%' }} alt="deliver.me" />
          </div>
          <Menu
            onSelect={onMenuSelect}
            theme="dark"
            mode="inline"
            key
            defaultSelectedKeys={['a_orders']}
            collapsed={state.collapsed.toString()}>
            <Menu.Item key="a_orders">
              <span className="menu_item_icon_user">
                <img src={allOrdersIcon} alt="All orders" />
              </span>
              <span className={state.collapsed ? 'collapsed' : ''}>
                Active orders
              </span>
            </Menu.Item>
            <Menu.Item key="my_pending">
              <span className="menu_item_icon_user">
                <img src={pendingOrdersIcon} alt="Pending orders" />
              </span>
              <span className={state.collapsed ? 'collapsed' : ''}>
                My Pending orders
              </span>
            </Menu.Item>
            <Menu.Item key="my_completed">
              <span className="menu_item_icon_user">
                <img src={doneOrdersIcon} alt="Completed orders" />
              </span>
              <span className={state.collapsed ? 'collapsed' : ''}>
                My Completed orders
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header_welcome">
            {state.collapsed ? (
              <MenuUnfoldOutlined onClick={toggle} className="trigger" />
            ) : (
              <MenuFoldOutlined onClick={toggle} className="trigger" />
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CreditCardOutlined
                style={{
                  fontSize: '30px',
                  color: 'white',
                  marginRight: '10px',
                }}
              />
              <Typography style={{ color: 'white' }}>
                Wallet: {amount ? amount : 0}
              </Typography>
            </div>
            <div>
              
              <Rate
                disabled
                style={{ marginRight: '10px' }}
                tooltips={desc}
                value={rating}
              />
              <UserPopover
                name={name}
                setMenuItem={setMenuItem}
                lastName={lastName}
                avatar={avatar}
              />
            </div>
          </Header>
          <Content
            style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              alignItems:"center",
              margin: '15px 15px',
              padding: 10,
              background: '#fff',
              minHeight: 280,}}
            >
            {menuItem === 'edit' && (
              <div className="company_profile_section_wrapper">
                <EditProfileInfo
                  handleCancelBtnClick={handleCancelEditInfoBtnClick}
                  handleSaveBtnClick={handleSaveInfoBtnClick}
                  handleEditBtnClick={handleEditInfoBtnClick}
                  isInputsEditable={isInputsEditable}
                  state={currentUserData}
                />
              </div>
            )}
            {menuItem==='a_orders' ? (gettingAllOrders? <Spinner />:           
            allOrdersData.map(el => {
             return( 
                <CardUser user={currentUserData} getActiveOrders={getActiveOrders} data={el} takeOrder={takeOrder} page={menuItem} key={el.id}/>
              )
            })):
            menuItem==='my_pending' ?gettingCompanyPendingOrders?<Spinner/>: companyPendingOrdersData.map(el=>{
              return (<CardUser user={currentUserData} getActiveOrders={getActiveOrders} data={el} doneOrder={doneOrder} page={menuItem} key={el.id} />)
            }):menuItem==='my_completed'?gettingCompanyDoneOrders?<Spinner/>:companyDoneOrdersData.map(el=>{
              return (<CardUser user={currentUserData} getActiveOrders={getActiveOrders} data={el}  page={menuItem} key={el.id}/>)
            }):""}
            
               
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

const mapStateToProps = state => {
  const { orders, currentUser } = state
  const { currentUserData } = currentUser
  console.log(orders.allOrdersData)
  return {
    orders,
    currentUserData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserPendOrders: id => {
      dispatch(getUserOrdersThunk(id,'pending'))
    },
    getUserDoneOrders: id => {
      dispatch(getUserOrdersThunk(id,'done'))
    },
    getActiveOrders: () => {
      dispatch(getAllOrdersThunk())
    },
    getUser: id => {
      dispatch(getUserByIdThunk(id))
    },
    updateUser: data => {
      dispatch(createUserThunk(data))
    },
    takeOrder:(data)=>{
      dispatch(updateOrderByUserThunk(data))
    },
    doneOrder:(data)=>{
      dispatch(updateOrderByUserThunk(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(userProfilePage)
