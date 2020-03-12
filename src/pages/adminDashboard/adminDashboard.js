import React, { useState, useEffect } from 'react'
import { Table, Typography, Popover, Input } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  ExportOutlined,
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
  getMoreUsersThunk,
} from '../../redux/thunk'
import audioSound from '../../assets/sound.mp3'
import history from '../../routes/history'
import { socket } from '../../services/socket'
import { successMessage, logOut } from '../../services/services'
import { ModalUserEdit } from '../../components/ModalUserEdit'
import { ModalCompanyEdit } from '../../components/ModalCompanyEdit'
import CountRequestInfo from '../../components/CountRequestInfo/CountRequestInfo'
import { useSelector } from 'react-redux'
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
  getMoreUsers,
  getCompanies,
  removeUser,
  removeCompany,
  updateUser,
  updateCompany,
  socketUser,
  socketCompany,
  lastUserData,
  hasUsers,
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
  const [lastUser, setLastUser] = useState(usersData)

  const audio = new Audio()
  useEffect(() => {
    getUsers(Date.now())

    getCompanies()
    socket.on('update_user_list', data => {
      successMessage(`${data.name} ${data.lastName} signed up !`)
      socketUser(data)
      audio.src = audioSound
      audio.play()
    })
    socket.on('update_company_list', data => {
      successMessage(`${data.name} signed up !`)
      socketCompany(data)
      audio.src = audioSound
      audio.play()
    })
  }, [])
  useEffect(() => {
    console.log(
      'effecct 2',
      usersData.length > 0 ? usersData[usersData.length - 1] : null
    )

    let lUser = usersData.length > 0 ? usersData[usersData.length - 1] : null
    console.log(lUser)
    if (hasUsers === true) {
      lUser = usersData.length > 0 ? usersData[usersData.length - 1] : null
      console.log(lUser)
      scrollLoading(lUser)
      console.log('=== chi')
      console.log('state after set', lastUser)
    } else {
      console.log('===')
      console.log('=== after set', lastUser)
    }
  }, [usersData.length])

  const scrollLoading = lUser => {
    window.addEventListener('scroll', () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      if (Math.ceil(scrolled) === scrollable) {
        if (lUser) {
          console.log(users)
          console.log(lUser, 'timeeeeeeeee')
          console.log(lUser.createdTime)
          setLastUser(lUser.id)
          console.log('more useers can get', hasUsers)
          getMoreUsers(lUser.createdTime)
        }
      }
    })
  }

  const filterByValue = (array, value) => {
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
      logOut()
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
              <ExportOutlined />
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
              (usersData.length === 0 ? (
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
                    pagination={false}
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
  users.usersData.sort((a, b) => b.createdTime - a.createdTime)

  const { usersData, hasUsers } = users

  return {
    users,
    companies,
    hasUsers,
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
    getUsers: lastUserTime => {
      dispatch(getUsersThunk(lastUserTime, 12))
    },
    getMoreUsers: lastUserTime => {
      dispatch(getMoreUsersThunk(lastUserTime, 12))
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
