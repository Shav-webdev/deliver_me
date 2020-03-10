import React from 'react'
import Button from 'antd/es/button'
import 'antd/dist/antd.css'
import './HomePage.css'
import LoginForm from '../../containers/login/login'

export default function HomePage() {
  return (
    <div className="login_section_wrapper">
      <div className="description_content_wrapper">
        <div className="description_wrapper">
          <h1>Deliver.me for you</h1>
          <p className="description_text">
            Delivery in about 30 to 60 minutes depending on location. Scheduled
            delivery. Try it out today!
          </p>
        </div>
        <div className="buttons_wrapper">
          <Button href="/register/company" type="primary" shape="round">
            Sign up as Company
          </Button>
          <Button href="/register/courier" type="primary" shape="round">
            Sign up as Courier
          </Button>
        </div>
      </div>
      <div className="login_section_container">
        <LoginForm />
      </div>
    </div>
  )
}
