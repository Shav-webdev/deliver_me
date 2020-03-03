import React, { useEffect, useState } from 'react'
import { Button, Icon, Layout, message, Upload } from 'antd'
import './profilePage.css'
import { getCookie } from '../registration/services/cookies'
import history from '../../routes/history'
import { currentCompany } from '../../redux/actions'
import { connect } from 'react-redux'
import List from 'antd/es/list'
import { Avatar } from 'antd'
import company_avatar from '../../assets/images/company_avatar.png'
import axios from 'axios'
import Popover from 'antd/es/popover'
import { logOut } from '../registration/services/services'
import Modal from 'antd/es/modal'
import Menu from 'antd/es/menu'

const { Header, Sider } = Layout

function ProfilePage(props) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const handleImageChange = event => {
    if (event.file.status === 'done') {
      console.log(event)
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfeoo5iog/upload'
      const CLOUDINARY_UPLOAD_PRESET = 'lvxujt8u'
      const formData = new FormData()
      formData.append('file', event.file.originFileObj)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      return axios
        .post(CLOUDINARY_URL, formData)
        .then(res => {
          setAvatarUrl(res.data.url)
          console.log(res.data.url)
          message.success(`${event.file.name} file uploaded successfully`)
          return res.data.url
        })
        .catch(e => console.log(e.message))
    }
  }

  useEffect(() => {
    if (!getCookie('token')) {
      history.push('/')
    }
    // eslint-disable-next-line no-useless-escape
  }, [])

  const handleCreateOrderClick = () => {
    setVisible(true)
  }

  const modalHandleOk = () => {
    setVisible(false)
  }
  const modalHandleCancel = () => {
    setVisible(false)
  }

  const content = (
    <div>
      <Button type="link" onClick={logOut}>
        Logout
      </Button>
    </div>
  )

  const { currentCompany } = props

  return (
    <>
      <Sider theme="light" width={300}>
        <div style={{ textAlign: 'center' }}>
          <Avatar
            shape="square"
            src={avatarUrl ? avatarUrl : company_avatar}
            size={128}
          />
          <Upload.Dragger
            showUploadList={false}
            multiple={false}
            onChange={e => handleImageChange(e)}
            customRequest={dummyRequest}
            accept=".jpg, .jpeg, .png">
            <Icon type="upload" /> Click to Upload
          </Upload.Dragger>
        </div>
        <div style={{ textAlign: 'center', padding: '.5rem 1.5rem' }}>
          <h2>Profile information</h2>
          {Object.keys(currentCompany)
            .filter(el => el.id)
            .map(el => {
              return (
                <List key={el}>
                  <List.Item>
                    <strong>{`${el} :`}</strong>
                    {` ${currentCompany[el]}`}
                  </List.Item>
                </List>
              )
            })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={handleCreateOrderClick}>Create order</Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">My orders</Menu.Item>
            <Menu.Item key="2">Active orders</Menu.Item>
            <Menu.Item key="3">Completed orders</Menu.Item>
          </Menu>
          <Popover
            placement="bottomRight"
            content={content}
            title="Profile settings"
            trigger="click">
            <Avatar src={avatarUrl ? avatarUrl : company_avatar} />
          </Popover>
        </Header>
      </Layout>
      <Modal
        title="Create Request"
        visible={visible}
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

function mapStateToProps(state) {
  return {
    currentCompany: state.companies.currentCompany,
    allCompanies: state.companies.allCompanies,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCurrentCompany: company => {
      dispatch(currentCompany(company))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
