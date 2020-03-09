import React, { useCallback, useState } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './login.css'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import { signInAs } from '../../redux/thunk'

function LoginForm({ signInAs }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleEmailChange = useCallback(e => {
    let email = e.target.value
    setEmail(email)
  }, [])

  const handlePasswordChange = useCallback(e => {
    const pass = e.target.value
    setPassword(pass)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    const data = {
      email,
      password,
    }

    signInAs(data)
    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  }
  return (
    <div className="login_wrapper">
      <h2>Sign in</h2>
      <Form onSubmit={e => handleSubmit(e)} className="login-form">
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

// const mapStateToProps = state => {
//   console.log(state)
//   const { users, companies } = state
//   return {
//     users,
//     companies,
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    signInAs: data => {
      dispatch(signInAs(data))
    },
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
