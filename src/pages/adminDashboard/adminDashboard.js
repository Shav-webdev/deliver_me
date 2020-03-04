import React, { useCallback, useState, useEffect } from 'react'
import { Table } from 'antd'
import { Layout, Menu, Icon, Button } from 'antd'
import { FastBackwardOutlined } from '@ant-design/icons-react'
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
import { errorMessage } from '../registration/services/services'
import ModalUserEdit from '../../components/ModalUserEdit/modal.userEdit'
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
  const { companiesData, gettingCompanies } = companies
  const [state, setState] = useState(defaultState)
  const [menuItem, setMenuItem] = useState('users')
  const [modalState, setModalState] = useState({ visible: false })
  const [modalUser, setModalUser] = useState({})
  useEffect(() => {
    getUsers()
    getCompanies()
  }, [])

  const showModalUser = ({ target: { id } }) => {
    const user = usersData.filter(el => el.id === id)
    setModalState({
      visible: true,
    })
    setModalUser(...user)
  }

  const handleOk = e => {
    console.log(e)
    console.log('modalOK')
    setModalState({
      visible: false,
    })
  }

  const handleCancel = e => {
    console.log(e)
    console.log('modalCANCEL')
    setModalState({
      visible: false,
    })
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

  const handleRemoveUser = ({ target: { id } }) => {
    removeUser(id)
  }
  const handleRemoveCompany = ({ target: { id } }) => {
    removeCompany(id)
  }
  const handleAcceptUser = ({ target: { id } }) => {
    const user = usersData.filter(el => el.id === id)
    user[0].approved = 'accepted'
    updateUser(...user)
  }
  const handleAcceptCompany = ({ target: { id } }) => {
    const company = companiesData.filter(el => el.id === id)
    company[0].approved = 'accepted'
    updateCompany(...company)
  }

  const handleDeclineUser = ({ target: { id } }) => {
    const user = usersData.filter(el => el.id === id)
    user[0].approved = 'declined'
    updateUser(...user)
  }
  const handleDeclineCompany = ({ target: { id } }) => {
    const company = companiesData.filter(el => el.id === id)
    company[0].approved = 'declined'
    updateCompany(...company)
  }
  return (
    <div>
      <ModalUserEdit
        handleCancel={handleCancel}
        handleOk={handleOk}
        visible={modalState.visible}
        modalUser={modalUser}
        updateUser={updateUser}
      />
      <Layout>
        <Sider
          trigger={null}
          style={{ minHeight: '100vh' }}
          collapsible
          collapsed={state.collapsed}>
          <div className="logo" />
          {console.log(users)}
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
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {state.collapsed ? (
              <Button onClick={toggle} className="trigger">
                Open
              </Button>
            ) : (
              <Button onClick={toggle} className="trigger">
                X
              </Button>
            )}
            Welcome to dashboard
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}>
            {console.log('tttt', users)}
            {menuItem === 'users' ? (
              gettingUsers ? (
                <Spinner />
              ) : (
                <Table dataSource={usersData}>
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
                      <img
                        style={{ height: '20px' }}
                        src={record.passportURL}></img>
                    )}
                  />
                  <Column
                    title="Approved"
                    key="approved"
                    render={(text, record) => record.approved}
                  />
                  <Column
                    title="Accept"
                    key="accept"
                    render={(text, record) => (
                      <span>
                        {/* <Button
                          id={record.id}
                          onClick={handleAcceptUser}
                          type={`primary ${
                            record.approved === 'accepted' ? 'disabled' : ''
                          }`}>
                          Accept
                        </Button> */}
                        <FastBackwardOutlined />
                      </span>
                    )}
                  />
                  <Column
                    title="Decline"
                    key="decline"
                    render={(text, record) => (
                      <span>
                        <Button
                          id={record.id}
                          type={`${
                            record.approved === 'declined'
                              ? 'prymary disabled'
                              : ''
                          }`}
                          onClick={handleDeclineUser}>
                          Decline
                        </Button>
                      </span>
                    )}
                  />
                  <Column
                    title="Edit"
                    key="edit"
                    render={(text, record) => (
                      <span>
                        <Button id={record.id} onClick={showModalUser}>
                          Edit
                        </Button>
                      </span>
                    )}
                  />
                  <Column
                    title="Delete"
                    key="delete"
                    render={(text, record) => (
                      <span>
                        <Button
                          type="danger"
                          id={record.id}
                          onClick={handleRemoveUser}>
                          Delete
                        </Button>
                      </span>
                    )}
                  />
                </Table>
              )
            ) : (
              <Table dataSource={companiesData}>
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
                  title="Approved"
                  key="approved"
                  render={(text, record) => record.approved}
                />
                <Column
                  title="Accept"
                  key="accept"
                  render={(text, record) => (
                    <span>
                      <Button
                        id={record.id}
                        onClick={handleAcceptCompany}
                        type={`primary ${
                          record.approved === 'accepted' ? 'disabled' : ''
                        }`}>
                        Accept
                      </Button>
                    </span>
                  )}
                />
                <Column
                  title="Decline"
                  key="decline"
                  render={(text, record) => (
                    <span>
                      <Button
                        id={record.id}
                        type={`primary ${
                          record.approved === 'declined'
                            ? 'prymary disabled'
                            : ''
                        }`}
                        onClick={handleDeclineCompany}>
                        Decline
                      </Button>
                    </span>
                  )}
                />
                <Column
                  title="Edit"
                  key="edit"
                  render={(text, record) => (
                    <span>
                      <Button>Edit</Button>
                    </span>
                  )}
                />
                <Column
                  title="Delete"
                  key="delete"
                  render={(text, record) => (
                    <span>
                      <Button
                        type="danger"
                        id={record.id}
                        onClick={handleRemoveCompany}>
                        Delete
                      </Button>
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
