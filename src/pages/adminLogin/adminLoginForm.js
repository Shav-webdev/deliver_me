import React, { useCallback, useState } from 'react'
import { Form, Icon, Input, Button, Typography } from 'antd'
import './adminLoginForm.css'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import { signInAsAdminThunk } from '../../redux/thunk'

const { Title } = Typography

function AdminLoginForm({ signInAdmin }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = useCallback(e => {
    let email = e.target.value
    setEmail(email)
  }, [])

  const handlePasswordChange = useCallback(e => {
    let pass = e.target.value
    setPassword(pass)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    const data = {
      email,
      password,
    }
    setLoading(false)
    console.log("loginadmin")
    signInAdmin(data)
  }
  if (loading) {
    return <Spinner />
  }
  return (
    <div className="admin-login_wrapper">
      <Form onSubmit={e => handleSubmit(e)} className="login-form">
        <Form.Item>
          <Title level={3}>Sign In</Title>
        </Form.Item>
        <Form.Item>
          <Input
            onChange={e => handleEmailChange(e)}
            value={email}
            placeholder="Email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={e => handlePasswordChange(e)}
            value={password}
            type="password"
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    signInAdmin: data => {
      dispatch(signInAsAdminThunk(data))
    },
  }
}

export default connect(null, mapDispatchToProps)(AdminLoginForm)
