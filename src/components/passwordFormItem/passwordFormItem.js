import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Icon } from 'antd'
import { validatePassword } from '../../pages/registration/helpers/validations'

export default function PasswordFormItem({
  getPasswordValue,
  label,
  defaultPass,
  hidePassValidVisible,
}) {
  const [password, setPassword] = useState(defaultPass ? defaultPass : '')
  const [showPasswordValidText, setShowPasswordValidText] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const onHandlePasswordValidate = () => {
    if (!validatePassword(password)) {
      setIsPasswordValid(false)
      setShowPasswordValidText(true)
    } else {
      setIsPasswordValid(true)
      setShowPasswordValidText(false)
      getPasswordValue(password)
    }
  }

  const handlePasswordChange = useCallback(e => {
    if (label !== 'Old password') {
      hidePassValidVisible()
    }
    let pass = e.target.value
    setPassword(pass)
    setShowPasswordValidText(false)
  }, [])

  return (
    <Form.Item
      label={label}
      validateStatus={showPasswordValidText ? 'error' : 'success'}
      hasFeedback={showPasswordValidText}
      help={
        showPasswordValidText
          ? 'Password should contain at least 8 characters, one digit, one lower, one upper case'
          : ''
      }>
      <Input
        onChange={e => handlePasswordChange(e)}
        onBlur={onHandlePasswordValidate}
        value={password}
        type="password"
        placeholder="Password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
    </Form.Item>
  )
}
