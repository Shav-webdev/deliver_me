import React from 'react'
import notFoundPic from '../../assets/images/404.png'
import Button from 'antd/es/button'
import 'antd/dist/antd.css'

export default function PageNotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <img src={notFoundPic} alt="Page not found" />
      <Button href="/" type="primary" shape="round">
        Home
      </Button>
    </div>
  )
}
