import React, { useState, useEffect } from 'react'
import { Table, Typography, Popover, Input } from 'antd'
import { getCookie, removeCookie } from '../registration/services/cookiesUtils'
import {logOut} from '../registration/services/services'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EditFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  ClockCircleOutlined,
} from '@ant-design/icons'
import logo from '../../assets/images/logo.svg'
import { Layout, Menu, Icon } from 'antd'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import './adminDashboard.css'
const { Search } = Input
import {
  getUsersThunk,
  getCompaniesThunk,
  removeUserThunk,
  removeCompanyThunk,
  createUserThunk,
  createCompanyThunk,
  addUserBySocketThunk,
  addCompanyBySocketThunk,
} from '../../redux/thunk'
import history from '../../routes/history'
import { socket } from '../../App'
import { errorMessage } from '../registration/services/services'
import { ModalUserEdit } from '../../components/ModalUserEdit'
import { ModalCompanyEdit } from '../../components/ModalCompanyEdit'
import CountRequestInfo from '../../components/CountRequestInfo/CountRequestInfo'
const { Header, Sider, Content } = Layout
const { Column } = Table

const defaultState = {
  collapsed: false,
  isUpdated: false,
  search: '',
}
let filtered = []
function AdminBoard({
  users,
  companies,
  getUsers,
  getCompanies,
  removeUser,
  removeCompany,
  updateUser,
  updateCompany,
  socketUser,
  socketCompany,
}) {
  const { usersData, gettingUsers } = users
  const { companiesData } = companies
  const [state, setState] = useState(defaultState)
  const [menuItem, setMenuItem] = useState('users')
  const [modalState, setModalState] = useState({
    visibleUser: false,
    visibleCompnay: false,
  })
  const [modalUser, setModalUser] = useState({})
  const [modalCompany, setModalCompany] = useState({})

  useEffect(() => {
    // if (!getCookie('token')) {
    //   history.push('/admin')
    // }else{
    getUsers()
    getCompanies()
    socket.on('update_user_list', data => {
      console.log(data)
      socketUser(data)
    })
    socket.on('update_company_list', data => {
      console.log(data)
      socketCompany(data)
    })
  }, [])

  const filterByValue = (array, value) => {
    console.log(array)
    if (array.length > 1) {
      return array.filter(
        data =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(value.toLowerCase()) !== -1
      )
    }
  }
  const handleSearch = () => {
    setState({
      ...state,
      search: event.target.value,
    })
  }

  const showModalUser = user => {
    setModalState({
      ...modalState,
      visibleUser: true,
    })
    setModalUser(user)
  }
  const showModalCompany = company => {
    setModalState({
      ...modalState,
      visibleCompany: true,
    })
    setModalCompany(company)
  }

  const handleOk = e => {
    setModalState({
      ...modalState,
      visibleUser: false,
    })
  }

  const handleCancel = e => {
    setModalState({
      ...state,
      visibleUser: false,
    })
  }

  const onMenuSelect = e => {
    if (e.key !== 'signOut') {
      setMenuItem(e.key)
    } else {
      // console.log('must remove',removeCookie('token'))
       logOut()
      //  eraseCookie('token')
      //  eraseCookie('userType')
      // removeCookie('token')
      // removeCookie('userType')
      // Cookies.remove('token', { path: '' });
      // Cookies.remove('userType', { path: '' });

      history.push('/admin')
    }
  }

  const toggle = () => {
    setState({
      ...state,
      collapsed: !state.collapsed,
    })
  }

  return (
    <div>
      <ModalUserEdit
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={modalState.visibleUser}
        modalUser={modalUser}
        updateUser={updateUser}
        removeUser={removeUser}
      />
      <ModalCompanyEdit
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={modalState.visibleCompany}
        modalCompany={modalCompany}
        updateCompany={updateCompany}
        removeCompany={removeCompany}
      />
      <Layout style={{ minWidth: '950px' }}>
        <Sider
          trigger={null}
          style={{ minHeight: '100vh' }}
          collapsible
          collapsed={state.collapsed}>
          <div className="logo_admin">
            <img src={logo} style={{ width: '90%' }} alt="deliver.me" />
          </div>
          <Menu
            onSelect={onMenuSelect}
            theme="dark"
            mode="inline"
            key
            defaultSelectedKeys={['users']}
            collapsed={state.collapsed.toString()}>
            <Menu.Item key="users">
              <Icon type="team" />
              <span>Users</span>
            </Menu.Item>
            <Menu.Item key="companies">
              <Icon type="shop" />
              <span>Companies</span>
            </Menu.Item>
            <Menu.Item key="signOut">
              <Icon type="LogoutOutlined" />
              <span>Sign Out</span>
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
            <Search
              className="search_admin"
              name="search"
              value={state.search}
              onChange={handleSearch}
              placeholder="Search"
            />
            <Typography className="typography_header">
              Welcome to dashboard
            </Typography>
            <CountRequestInfo
              data={menuItem === 'users' ? usersData : companiesData}
            />
          </Header>
          <Content
            style={{
              margin: '15px 15px',
              padding: 10,
              background: '#fff',
              minHeight: 280,
            }}>
            {menuItem === 'users' &&
              (gettingUsers ? (
                <Spinner />
              ) : (
                (usersData.sort(
                  (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
                ),
                (filtered = filterByValue(usersData, state.search)),
                (
                  <Table
                    rowKey={record => record.id}
                    onRow={r => ({
                      onClick: () => showModalUser(r),
                    })}
                    pagination={{
                      pageSize: 9,
                    }}
                    dataSource={filtered}>
                    <Column
                      key="name"
                      title="Name"
                      render={(text, record) => (
                        <span>
                          <Typography onClick={() => showModalUser(record)}>
                            {record.name}
                          </Typography>
                        </span>
                      )}
                    />
                    <Column
                      title="Last Name"
                      key="lastName"
                      dataIndex="lastName"
                    />
                    <Column title="Phone" dataIndex="phone" key="phone" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                      title="Photo"
                      key="passportURL"
                      render={(text, record) => (
                        <Popover
                          placement="leftBottom"
                          content={
                            <img
                              style={{ height: '300px' }}
                              src={record.passportURL}></img>
                          }
                          title={record.name + ' ' + record.lastName}>
                          <img
                            style={{ height: '20px' }}
                            src={record.passportURL}></img>
                        </Popover>
                      )}
                    />
                    <Column
                      title="Status"
                      key="approved"
                      render={(text, record) =>
                        record.approved === 'accepted' ? (
                          <span>
                            <CheckCircleFilled
                              style={{
                                color: 'orange',
                                marginRight: '5px',
                              }}
                            />
                            {record.approved}
                          </span>
                        ) : record.approved === 'declined' ? (
                          <span>
                            <CloseCircleFilled
                              style={{
                                color: 'red',
                                marginRight: '5px',
                              }}
                            />
                            {record.approved}
                          </span>
                        ) : (
                          <span>
                            <ClockCircleOutlined
                              style={{ color: '#595959', marginRight: '5px' }}
                            />{' '}
                            {record.approved}
                          </span>
                        )
                      }
                    />
                  </Table>
                ))
              ))}
            {menuItem === 'companies' &&
              (companiesData.sort(
                (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
              ) && (filtered = filterByValue(companiesData, state.search)),
              (
                <Table
                  rowKey={record => record.id}
                  onRow={r => ({
                    onClick: () => showModalCompany(r),
                  })}
                  pagination={{
                    pageSize: 9,
                  }}
                  dataSource={filtered}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column
                    title="TaxNumber"
                    dataIndex="taxNumber"
                    key="taxNumber"
                  />
                  <Column title="Phone" dataIndex="phone" key="phone" />
                  <Column title="Email" dataIndex="email" key="email" />
                  <Column title="Address" dataIndex="address" key="address" />
                  <Column
                    title="Amount"
                    key="amount"
                    render={(text, record) => record.amount}
                  />
                  <Column
                    title="Status"
                    key="approved"
                    render={(text, record) =>
                      record.approved === 'accepted' ? (
                        <span>
                          <CheckCircleFilled
                            style={{
                              color: 'orange',
                              marginRight: '5px',
                            }}
                          />
                          {record.approved}
                        </span>
                      ) : record.approved === 'declined' ? (
                        <span>
                          <CloseCircleFilled
                            style={{
                              color: 'red',
                              marginRight: '5px',
                            }}
                          />
                          {record.approved}
                        </span>
                      ) : (
                        <span>
                          <ClockCircleOutlined
                            style={{ color: '#595959', marginRight: '5px' }}
                          />{' '}
                          {record.approved}
                        </span>
                      )
                    }
                  />
                </Table>
              ))}
          </Content>
        </Layout>
      </Layout>
    </div>
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
    socketUser: data => {
      dispatch(addUserBySocketThunk(data))
    },
    socketCompany: data => {
      dispatch(addCompanyBySocketThunk(data))
    },
    getUsers: () => {
      dispatch(getUsersThunk())
    },
    getCompanies: () => {
      dispatch(getCompaniesThunk())
    },
    removeUser: id => {
      dispatch(removeUserThunk(id))
    },
    removeCompany: id => {
      dispatch(removeCompanyThunk(id))
    },
    updateUser: data => {
      dispatch(createUserThunk(data))
    },
    updateCompany: data => {
      dispatch(createCompanyThunk(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminBoard)
