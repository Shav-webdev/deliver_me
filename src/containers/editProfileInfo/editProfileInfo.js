import React, { useEffect, useState, useCallback } from 'react'
import {
  validateName,
  validateAddress,
  validatePhoneNumber,
  validateTaxNumber,
  validateActivity,
} from '../../pages/registration/helpers/validations'
import Spinner from '../../components/spiner/spinner'
import { Button, Icon, message, Upload, Form, Input, Avatar } from 'antd'
import axios from 'axios'
import ConfirmModal from '../../components/confirmModal/confirmModal'

export default function EditProfileInfo({
  isInputsEditable,
  loading,
  defaultUrl,
  companyDataUrl,
  deleteAccount,
  state,
  handleEditBtnClick,
  handleSaveBtnClick,
  handleCancelBtnClick,
}) {
  const { id, name, taxNumber, address, phone, activity, avatar } = state

  const [companyName, setCompanyName] = useState(name ? name : '')
  const [companyAddress, setCompanyAddress] = useState(address ? address : '')
  const [phoneNumber, setPhoneNumber] = useState(phone ? phone : '')
  const [companyTaxNumber, setCompanyTaxNumber] = useState(
    taxNumber ? taxNumber : ''
  )
  const [avatarUrl, setAvatarUrl] = useState('')
  const [companyActivity, setCompanyActivity] = useState(
    activity ? activity : ''
  )

  const [isNameValid, setIsNameValid] = useState(null)
  const [isAddressValid, setIsAddressValid] = useState(null)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(null)
  const [isTaxNumberValid, setIsTaxNumberValid] = useState(null)
  const [isActivityValid, setIsActivityValid] = useState(null)

  const [showNameValidText, setShowNameValidText] = useState(false)
  const [showAddressValidText, setShowAddressValidText] = useState(false)
  const [showPhoneNumValidText, setShowPhoneNumValidText] = useState(false)
  const [showTaxNumValidText, setShowTaxNumValidText] = useState(false)
  const [showActivityValidText, setShowActivityValidText] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)

  useEffect(() => {
    if (isInputsEditable) {
      onHandleNameValidate()
      onHandleAddressValidate()
      onHandlePhoneNumValidate()
      onHandleTaxNumValidate()
      onHandleActivityValidate()
    }
  }, [isInputsEditable])

  const handleNameChange = useCallback(e => {
    const name = e.target.value
    setCompanyName(name)
    setShowNameValidText(false)
  }, [])

  const onHandleNameValidate = () => {
    if (validateName(companyName)) {
      setIsNameValid(true)
      setShowNameValidText(false)
    } else {
      setIsNameValid(false)
      setShowNameValidText(true)
    }
  }

  const handleAddressChange = useCallback(e => {
    const address = e.target.value
    setCompanyAddress(address)
    setShowAddressValidText(false)
  }, [])

  const onHandleAddressValidate = () => {
    if (validateAddress(companyAddress)) {
      setIsAddressValid(true)
      setShowAddressValidText(false)
    } else {
      setIsAddressValid(false)
      setShowAddressValidText(true)
    }
  }

  const handlePhoneNumChange = useCallback(e => {
    let number = e.target.value
    setPhoneNumber(number)
    setShowPhoneNumValidText(false)
  }, [])

  const onHandlePhoneNumValidate = () => {
    if (validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumberValid(true)
      setShowPhoneNumValidText(false)
    } else {
      setIsPhoneNumberValid(false)
      setShowPhoneNumValidText(true)
    }
  }

  const handleTaxNumChange = useCallback(e => {
    let number = e.target.value
    setCompanyTaxNumber(number)
    setShowTaxNumValidText(false)
  }, [])

  const onHandleTaxNumValidate = () => {
    if (validateTaxNumber(companyTaxNumber)) {
      setIsTaxNumberValid(true)
      setShowTaxNumValidText(false)
    } else {
      setIsTaxNumberValid(false)
      setShowTaxNumValidText(true)
    }
  }

  const handleActivityChange = useCallback(e => {
    let activityValue = e.target.value
    setCompanyActivity(activityValue)
    setShowActivityValidText(false)
  }, [])

  const onHandleActivityValidate = () => {
    if (validateActivity(companyActivity)) {
      setIsActivityValid(true)
      setShowActivityValidText(false)
    } else {
      setIsActivityValid(false)
      setShowActivityValidText(true)
    }
  }

  const handleEditInfoBtnClick = () => {
    handleEditBtnClick()
    setCompanyName(name)
    setCompanyTaxNumber(taxNumber)
    setCompanyAddress(address)
    setCompanyActivity(activity)
    setPhoneNumber(phone)
  }

  const handleSaveInfoBtnClick = () => {
    onHandleNameValidate()
    onHandleAddressValidate()
    onHandlePhoneNumValidate()
    onHandleTaxNumValidate()
    onHandleActivityValidate()
    const data = {
      id,
      name: companyName,
      address: companyAddress,
      phone: phoneNumber,
      taxNumber: companyTaxNumber,
      activity: companyActivity,
      avatar: avatarUrl,
    }

    if (!isNameValid) {
      setShowNameValidText(true)
    } else if (!isAddressValid) {
      setShowAddressValidText(true)
    } else if (!isPhoneNumberValid) {
      setShowPhoneNumValidText(true)
    } else if (!isTaxNumberValid) {
      setShowTaxNumValidText(true)
    } else if (!isActivityValid) {
      setShowActivityValidText(true)
    } else if (
      !isNameValid &&
      !isAddressValid &&
      !isPhoneNumberValid &&
      !isTaxNumberValid &&
      !isActivityValid
    ) {
      setShowNameValidText(true)
      setShowAddressValidText(true)
      setShowPhoneNumValidText(true)
      setShowTaxNumValidText(true)
      setShowActivityValidText(true)
    } else {
      handleSaveBtnClick(data)
    }
  }

  const handleCancelEditInfoBtnClick = () => {
    handleCancelBtnClick()
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const handleImageChange = event => {
    if (event.file.status === 'done') {
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfeoo5iog/upload'
      const CLOUDINARY_UPLOAD_PRESET = 'lvxujt8u'
      const formData = new FormData()
      formData.append('file', event.file.originFileObj)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      return axios
        .post(CLOUDINARY_URL, formData)
        .then(res => {
          setAvatarUrl(res.data.url)
          message.success(`${event.file.name} file uploaded successfully`)
          console.log({
            ...state,
            avatar: res.data.url,
          })
          return res.data.url
        })
        .catch(e => console.log(e.message))
    }
  }

  const handleDelAccountBtnClick = e => {
    setConfirmVisible(true)
  }

  const deleteModalHandleCancel = () => {
    setConfirmVisible(false)
  }

  const handleDeleteAccount = () => {
    console.log(id)
    deleteAccount(id)
    setConfirmVisible(false)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Form className="company_info_form">
        <div className="company_change_avatar_section">
          <div>
            <Avatar
              size={128}
              src={avatar ? avatar : avatarUrl ? avatarUrl : defaultUrl}
            />
          </div>
          <div className="company_upload_avatar_wrapper">
            <Upload.Dragger
              showUploadList={false}
              multiple={false}
              disabled={!isInputsEditable}
              onChange={e => handleImageChange(e)}
              customRequest={dummyRequest}
              accept=".jpg, .jpeg, .png, .svg">
              <Icon type="upload" /> Change avatar
            </Upload.Dragger>
          </div>
        </div>
        <Form.Item
          label="Name"
          validateStatus={showNameValidText ? 'error' : 'success'}
          hasFeedback={showNameValidText}
          help={
            showNameValidText
              ? 'Name should contain at least two characters'
              : ''
          }>
          <Input
            disabled={!isInputsEditable}
            onChange={handleNameChange}
            value={isInputsEditable ? companyName : name}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          validateStatus={showAddressValidText ? 'error' : 'success'}
          hasFeedback={showAddressValidText}
          help={
            showAddressValidText
              ? 'Address should contain at least two characters'
              : ''
          }>
          <Input
            disabled={!isInputsEditable}
            onChange={e => handleAddressChange(e)}
            value={isInputsEditable ? companyAddress : address}
          />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          validateStatus={showPhoneNumValidText ? 'error' : 'success'}
          hasFeedback={showPhoneNumValidText}
          help={
            showPhoneNumValidText
              ? 'Phone number should contain only 8 digit either ( e.g "12345678" or "12-345-678")'
              : ''
          }>
          <Input
            disabled={!isInputsEditable}
            onChange={e => handlePhoneNumChange(e)}
            value={isInputsEditable ? phoneNumber : phone}
          />
        </Form.Item>
        <Form.Item
          label="Tax Number"
          validateStatus={showTaxNumValidText ? 'error' : 'success'}
          hasFeedback={showTaxNumValidText}
          help={
            showTaxNumValidText
              ? 'Tax number should contain only 8 digit either'
              : ''
          }>
          <Input
            disabled={!isInputsEditable}
            onChange={e => handleTaxNumChange(e)}
            value={isInputsEditable ? companyTaxNumber : taxNumber}
          />
        </Form.Item>
        <Form.Item
          label="Activity"
          validateStatus={showActivityValidText ? 'error' : 'success'}
          hasFeedback={showActivityValidText}
          help={
            showActivityValidText
              ? 'Activity should contain at least two characters'
              : ''
          }>
          <Input
            disabled={!isInputsEditable}
            onChange={e => handleActivityChange(e)}
            value={isInputsEditable ? companyActivity : activity}
          />
        </Form.Item>
        <div className="company_edit_info_profile">
          <Button type="danger" onClick={handleDelAccountBtnClick}>
            Delete account
          </Button>
          {!isInputsEditable && (
            <Button type="primary" onClick={handleEditInfoBtnClick}>
              Edit
            </Button>
          )}
          {isInputsEditable && (
            <Button type="primary" onClick={handleCancelEditInfoBtnClick}>
              Cancel
            </Button>
          )}

          <Button
            disabled={!isInputsEditable}
            type="primary"
            onClick={handleSaveInfoBtnClick}>
            Save
          </Button>
        </div>
      </Form>
      <ConfirmModal
        handleDelete={handleDeleteAccount}
        visible={confirmVisible}
        deleteModalHandleCancel={deleteModalHandleCancel}
        confirmVisible={confirmVisible}
        title="Delete Account"
        okText="Delete">
        On press delete all your data will be lost
      </ConfirmModal>
    </>
  )
}
