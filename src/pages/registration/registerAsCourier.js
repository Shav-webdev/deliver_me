import React, { useCallback, useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { socket } from '../../App'
import axios from 'axios'
import {
  Form,
  Input,
  Select,
  Button,
  Typography,
  Icon,
  Upload,
  message,
} from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { signUp } from '../../services/services'
import history from '../../routes/history'
import './registerAsCourier.css'
import {
  validateEmail,
  validatePassword,
  validateName,
  validateAddress,
  validatePhoneNumber,
} from './helpers/validations'
import Spinner from '../../components/spiner/spinner'
const { Option } = Select
const { Title } = Typography

function RegisterAsCourier() {
  const [loading, setLoading] = useState(false)
  const [passportURL, setPassportURL] = useState('')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [isNameValid, setIsNameValid] = useState(null)
  const [isAddressValid, setIsAddressValid] = useState(null)
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(null)
  const [showEmailValidText, setShowEmailValidText] = useState(false)
  const [showPasswordValidText, setShowPasswordValidText] = useState(false)
  const [showNameValidText, setShowNameValidText] = useState(false)
  const [showAddressValidText, setShowAddressValidText] = useState(false)
  const [showPhoneNumValidText, setShowPhoneNumValidText] = useState(false)

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  // const { getFieldDecorator } = this.props.form;

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
          setPassportURL(res.data.url)
          console.log(res.data.url)
          message.success(`${event.file.name} file uploaded successfully`)
          return res.data.url
        })
        .catch(e => console.log(e.message))
    }
  }

  const handleEmailChange = useCallback(e => {
    let email = e.target.value
    setEmail(email)
    setShowEmailValidText(false)
  }, [])

  const onHandleEmailValidate = () => {
    if (validateEmail(email)) {
      setIsEmailValid(true)
      setShowEmailValidText(false)
    } else {
      setIsEmailValid(false)
      setShowEmailValidText(true)
    }
  }

  const handleNameChange = useCallback(e => {
    let name = e.target.value
    setName(name)
    setShowNameValidText(false)
  }, [])

  const onHandleNameValidate = () => {
    if (validateName(name)) {
      setIsNameValid(true)
      setShowNameValidText(false)
    } else {
      setIsNameValid(false)
      setShowNameValidText(true)
    }
  }

  const handleLastNameChange = useCallback(e => {
    let lastName = e.target.value
    setLastName(lastName)
    setShowNameValidText(false)
  }, [])

  const onHandleLastNameValidate = () => {
    if (validateName(lastName)) {
      setIsNameValid(true)
      setShowNameValidText(false)
    } else {
      setIsNameValid(false)
      setShowNameValidText(true)
    }
  }

  const handleAddressChange = useCallback(e => {
    let address = e.target.value
    setAddress(address)
    setShowAddressValidText(false)
  }, [])

  const onHandleAddressValidate = () => {
    if (validateAddress(address)) {
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

  const onHandlePasswordValidate = () => {
    if (validatePassword(password)) {
      setIsPasswordValid(true)
      setShowPasswordValidText(false)
    } else {
      setIsPasswordValid(false)
      setShowPasswordValidText(true)
    }
  }

  const handlePasswordChange = useCallback(e => {
    let pass = e.target.value
    setPassword(pass)
    setShowPasswordValidText(false)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    let url = 'https://thawing-ravine-80499.herokuapp.com/user'
    const data = {
      name,
      email,
      password,
      address,
      phone: phoneNumber,
      lastName,
      passportURL,
    }

    if (
      !isNameValid &&
      !isEmailValid &&
      !isPasswordValid &&
      !isAddressValid &&
      !isPhoneNumberValid
    ) {
      setShowNameValidText(true)
      setShowEmailValidText(true)
      setShowPasswordValidText(true)
      setShowAddressValidText(true)
      setShowPhoneNumValidText(true)
    } else if (!isNameValid) {
      setShowNameValidText(true)
    } else if (!isEmailValid) {
      setShowEmailValidText(true)
    } else if (!isPasswordValid) {
      setShowPasswordValidText(true)
    } else if (!isAddressValid) {
      setShowAddressValidText(true)
    } else if (!isPhoneNumberValid) {
      setShowPhoneNumValidText(true)
    } else {
      signUp(url, data)
      setLoading(true)
      setTimeout(() => {
        history.push('/')
      }, 1000)
    }
  }

  const prefixSelector = (
    <Select style={{ width: 70 }}>
      <Option value="374">+374</Option>
    </Select>
  )

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      address &&
      phoneNumber &&
      lastName &&
      passportURL
    ) {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }, [name, email, password, address, phoneNumber, lastName, passportURL])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="formCourierWrapper">
      <Form className="formCourier" onSubmit={e => handleSubmit(e)}>
        <FormItem>
          <Title level={3}>Sign Up</Title>
        </FormItem>
        <Form.Item
          label="Name"
          validateStatus={showNameValidText ? 'error' : 'success'}
          hasFeedback={showNameValidText}
          help={
            showNameValidText
              ? 'The input should contain at min 2 max 16 characters'
              : ''
          }>
          <Input
            onChange={e => handleNameChange(e)}
            onBlur={onHandleNameValidate}
            value={name}
            placeholder="Name"
            prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          validateStatus={showNameValidText ? 'error' : 'success'}
          hasFeedback={showNameValidText}
          help={
            showNameValidText
              ? 'The input should contain at min 2 max 16 characters'
              : ''
          }>
          <Input
            onChange={e => handleLastNameChange(e)}
            onBlur={onHandleLastNameValidate}
            value={lastName}
            placeholder="Last Name"
            prefix={<Icon type="name" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item
          label="E-mail"
          validateStatus={showEmailValidText ? 'error' : 'success'}
          hasFeedback={showEmailValidText}
          help={showEmailValidText ? 'The input is not valid E-mail!' : ''}>
          <Input
            onChange={e => handleEmailChange(e)}
            onBlur={onHandleEmailValidate}
            value={email}
            placeholder="Email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item
          label="Password"
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
        <Form.Item
          label="Address"
          validateStatus={showAddressValidText ? 'error' : 'success'}
          hasFeedback={showAddressValidText}
          help={
            showAddressValidText
              ? 'The input exceeds the limit on the number of characters allowed'
              : ''
          }>
          <Input
            onChange={e => handleAddressChange(e)}
            onBlur={onHandleAddressValidate}
            value={address}
            placeholder="Address"
            prefix={
              <Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
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
            onChange={e => handlePhoneNumChange(e)}
            onBlur={onHandlePhoneNumValidate}
            value={phoneNumber}
            placeholder="Phone Number"
            addonBefore={prefixSelector}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Upload Passport photo"
          rules={[{ required: true, message: 'Please upload an image!' }]}>
          <Upload.Dragger
            onChange={e => handleImageChange(e)}
            customRequest={dummyRequest}
            accept=".jpg, .jpeg, .png, .svg">
            <Icon type="upload" /> Click to Upload
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button
            disabled={isBtnDisabled}
            style={{ marginTop: '1rem' }}
            type="primary"
            htmlType="submit"
            shape="round">
            Register
          </Button>
        </Form.Item>
        <Form.Item>
          <Button href="/login" type="link">
            Already have an account? Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default RegisterAsCourier
