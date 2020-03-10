import React, { useState, useEffect } from 'react'
import { Badge } from 'antd'
import './countRequestInfo.css'
import {
  ClockCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  TeamOutlined,
} from '@ant-design/icons'
const defaultState = {
  users: 0,
  accepted: 0,
  declined: 0,
  pending: 0,
}
const CountRequestInfo = ({ data }) => {
  const [state, setState] = useState(defaultState)
  useEffect(() => {
    const accept = data.filter(el => el.approved === 'accepted')
    const decline = data.filter(el => el.approved === 'declined')
    const pend = data.filter(el => el.approved === 'pending')
    setState({
      ...state,
      users: data.length,
      accepted: accept.length,
      declined: decline.length,
      pending: pend.length,
    })
  }, [data])
  return (
    <div style={{ marginRight: '20px', marginTop: '10px' }}>
      <Badge className="badge_margin" count={state.users}>
        <TeamOutlined style={{ fontSize: '20px', color: 'white' }} />
      </Badge>
      <Badge className="badge_margin" count={state.accepted}>
        <CheckCircleFilled style={{ fontSize: '20px', color: 'orange' }} />
      </Badge>
      <Badge className="badge_margin" count={state.declined}>
        <CloseCircleFilled style={{ fontSize: '20px', color: 'white' }} />
      </Badge>
      <Badge className="badge_margin" count={state.pending}>
        <ClockCircleOutlined style={{ color: 'white', fontSize: '20px' }} />
      </Badge>
    </div>
  )
}

export default CountRequestInfo
