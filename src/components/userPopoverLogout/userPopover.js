import React from 'react'
import { Popover, Avatar, Typography } from 'antd'
import { ExportOutlined, EditOutlined } from '@ant-design/icons'
import { logOut } from '../../services/services'

const UserPopover = ({ avatar, name, lastName ,setMenuItem}) => {
  const handleLogOut = () => {
    logOut()
  }
const handleEdit=()=>{
  setMenuItem('edit')
}
  const content = (
    <div>
      <Typography>
        {name} {lastName}
      </Typography>
      <div
        onClick={handleEdit}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '15px',
          cursor: 'pointer',
          marginBottom: '5px',
        }}>
        <EditOutlined style={{ marginRight: '5px' }} />
        <Typography>Edit</Typography>
      </div>
      <div
        onClick={handleLogOut}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <ExportOutlined style={{ marginRight: '5px' }} />
        <Typography>Log out</Typography>
      </div>
    </div>
  )

  return (
    <Popover placement="bottomRight" content={content} title="Profile">
      <Avatar style={{ marginRight: '30px' }} src={avatar} size={48} />
    </Popover>
  )
}

export default UserPopover
