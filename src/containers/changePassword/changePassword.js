import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Select, Button, Typography, Icon } from 'antd'
import { validatePassword } from '../../pages/registration/helpers/validations'
import PasswordFormItem from '../../components/passwordFormItem/passwordFormItem'
import ConfirmModal from '../../components/confirmModal/confirmModal'

export default function ChangePassword({
  changePassVisible,
  changePassModalHandleCancel,
  changePassBtnClick,
}) {
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const [confirmPassValidVisible, setConfirmPassValidVisible] = useState(false)

  const getOldPassValue = pass => {
    console.log(pass)
    setOldPassword(pass)
    console.log(password)
  }

  const getFirstPassValue = pass => {
    console.log(pass)
    setPassword(pass)
    console.log(password)
  }
  const getSecondPassValue = pass => {
    console.log(pass)
    setPassword1(pass)
    console.log(password1)
  }

  const hidePassValidVisible = () => {
    setConfirmPassValidVisible(false)
  }

  const modalHandleCancel = () => {
    setPassword('')
    setPassword1('')
    changePassModalHandleCancel()
  }

  const handleChangePass = () => {
    if (password !== password1) {
      setConfirmPassValidVisible(true)
    } else {
      const data = {
        old_password: oldPassword,
        new_password: password1,
      }
      console.log('change pass', data)
      changePassBtnClick(data)
    }

    //changePassModalHandleCancel()
  }

  return (
    <ConfirmModal
      handleOk={handleChangePass}
      okButtonProps={{ disabled: confirmPassValidVisible }}
      modalHandleCancel={modalHandleCancel}
      confirmVisible={changePassVisible}
      title="Change Password"
      okText="Change">
      <Form>
        <PasswordFormItem
          hidePassValidVisible={hidePassValidVisible}
          label="Old password"
          getPasswordValue={getOldPassValue}
        />
        <PasswordFormItem
          hidePassValidVisible={hidePassValidVisible}
          label="New password"
          getPasswordValue={getFirstPassValue}
        />
        <PasswordFormItem
          hidePassValidVisible={hidePassValidVisible}
          label="Confirm password"
          getPasswordValue={getSecondPassValue}
        />
        {confirmPassValidVisible && (
          <span style={{ color: 'red', fontSize: 14 }}>
            New password and confirm password does not match
          </span>
        )}
      </Form>
    </ConfirmModal>
  )
}
