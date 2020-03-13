import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Avatar } from 'antd'
import { logOut } from '../../services/services'
import Popover from 'antd/es/popover'

export default function LogoutPopover(props) {
  const content = (
    <div>
      <p>
        <Link style={{ padding: '0 15px' }} to="/company/profile_info">
          Profile information
        </Link>
      </p>
      <p style={{ marginBottom: '5px' }}>
        <Button type="link" onClick={logOut} style={{ padding: '0 15px', height: '0' }}>
          Logout
        </Button>
      </p>
    </div>
  )
  return (
    <Popover
      placement="bottomRight"
      content={content}
      title="Profile settings"
      trigger="click">
      <Avatar
        size="large"
        src={
          props.avatarUrl
            ? props.avatarUrl
            : props.companyDataUrl
              ? props.companyDataUrl
              : props.default
        }
      />
    </Popover>
  )
}
