import React, { useState, useEffect } from 'react'
import { Table, Typography, Popover } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EditFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
} from '@ant-design/icons'
import { Layout, Menu, Icon } from 'antd'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import './adminDashboard.css'
import {
  getUsersThunk,
  getCompaniesThunk,
  removeUserThunk,
  removeCompanyThunk,
  createUserThunk,
  createCompanyThunk,
} from '../../redux/thunk'
import history from '../../routes/history'
import { errorMessage } from '../registration/services/services'
import { ModalUserEdit } from '../../components/ModalUserEdit'
import { ModalCompanyEdit } from '../../components/ModalCompanyEdit'
import CountRequestInfo from '../../components/CountRequestInfo/CountRequestInfo'
const { Header, Sider, Content } = Layout
const { Column } = Table

const defaultState = {
  collapsed: false,
  isUpdated: false,
}
function AdminBoard({
  users,
  companies,
  getUsers,
  getCompanies,
  removeUser,
  removeCompany,
  updateUser,
  updateCompany,
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
    getUsers()
    getCompanies()
  }, [])

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
      history.push('./admin')
    }
  }

  const toggle = () => {
    setState({
      ...state,
      collapsed: !state.collapsed,
    })
  }

  const handleRemoveUser = id => {
    removeUser(id)
  }
  const handleRemoveCompany = id => {
    removeCompany(id)
  }
  const handleAcceptUser = user => {
    updateUser({ ...user, approved: 'accepted' })
  }
  const handleAcceptCompany = company => {
    updateCompany({ ...company, approved: 'accepted' })
  }

  const handleDeclineUser = user => {
    updateUser({ ...user, approved: 'declined' })
  }
  const handleDeclineCompany = company => {
    updateCompany({ ...company, approved: 'declined' })
  }
  return (
    <div>
      <ModalUserEdit
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={modalState.visibleUser}
        modalUser={modalUser}
        updateUser={updateUser}
      />
      <ModalCompanyEdit
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={modalState.visibleCompany}
        modalCompany={modalCompany}
        updateCompany={updateCompany}
      />
      <Layout>
        <Sider
          trigger={null}
          style={{ minHeight: '100vh' }}
          collapsible
          collapsed={state.collapsed}>
          <Typography className="typography_text">Deliver.me</Typography>
          <Menu
            onSelect={onMenuSelect}
            theme="dark"
            mode="inline"
            key
            defaultSelectedKeys={['users']}
            inlineCollapsed={state.collapsed}>
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
                // usersData.sort((a, b) => a.approved - b.approved),
                <Table
                  pagination={{
                    pageSize: 9,
                  }}
                  dataSource={usersData}>
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column
                    title="Last Name"
                    dataIndex="lastName"
                    key="lastName"
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
                    render={(text, record) => record.approved}
                  />
                  <Column
                    title=""
                    key="accept"
                    render={(text, record) => (
                      <span>
                        <CheckCircleFilled
                          onClick={() => handleAcceptUser(record)}
                          style={{
                            color: 'orange',
                            display: `${
                              record.approved === 'accepted' ? 'none' : 'block'
                            }`,
                          }}
                        />
                      </span>
                    )}
                  />
                  <Column
                    title=""
                    key="decline"
                    render={(text, record) => (
                      <span>
                        <CloseCircleFilled
                          style={{
                            color: 'red',
                            display: `${
                              record.approved === 'declined' ? 'none' : 'block'
                            }`,
                          }}
                          onClick={() => handleDeclineUser(record)}
                        />
                      </span>
                    )}
                  />
                  <Column
                    title=""
                    key="edit"
                    render={(text, record) => (
                      <span>
                        <EditFilled onClick={() => showModalUser(record)} />
                      </span>
                    )}
                  />
                  <Column
                    title=""
                    key="delete"
                    render={(text, record) => (
                      <span>
                        <DeleteFilled
                          onClick={() => handleRemoveUser(record.id)}
                        />
                      </span>
                    )}
                  />
                </Table>
              ))}
            {menuItem === 'companies' && (
              // (companiesData.sort((a, b) => a.approved - b.approved),
              <Table
                pagination={{
                  pageSize: 9,
                }}
                dataSource={companiesData}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                  title="TaxNumber"
                  dataIndex="taxNumber"
                  key="taxNumber"
                />
                <Column title="Phone" dataIndex="phone" key="phone" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column title="Activity" dataIndex="activity" key="activity" />
                <Column
                  title="Amount"
                  key="amount"
                  render={(text, record) => record.amount}
                />
                <Column
                  title="Status"
                  key="approved"
                  render={(text, record) => record.approved}
                />
                <Column
                  style={{ textAlign: 'center' }}
                  title=""
                  key="accept"
                  render={(text, record) => (
                    <span>
                      <CheckCircleFilled
                        onClick={() => handleAcceptCompany(record)}
                        style={{
                          color: 'orange',
                          display: `${
                            record.approved === 'accepted' ? 'none' : 'block'
                          }`,
                        }}
                      />
                    </span>
                  )}
                />
                <Column
                  title=""
                  key="decline"
                  render={(text, record) => (
                    <span>
                      <CloseCircleFilled
                        style={{
                          color: 'red',
                          display: `${
                            record.approved === 'declined' ? 'none' : 'block'
                          }`,
                        }}
                        onClick={() => handleDeclineCompany(record)}
                      />
                    </span>
                  )}
                />
                <Column
                  title=""
                  key="edit"
                  render={(text, record) => (
                    <span>
                      <EditFilled onClick={() => showModalCompany(record)} />
                    </span>
                  )}
                />
                <Column
                  title=""
                  key="delete"
                  render={(text, record) => (
                    <span>
                      <DeleteFilled
                        onClick={() => handleRemoveCompany(record.id)}
                      />
                    </span>
                  )}
                />
              </Table>
            )}
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
