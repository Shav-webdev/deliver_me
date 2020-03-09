import React from 'react'

export default function SubTitle(props) {
  return (
    <div style={{ width: '100%' }}>
      <h2
        style={{
          borderBottom: '1px solid #000',
          textAlign: 'center',
          width: 'maxContent',
        }}>
        {props.children}
      </h2>
    </div>
  )
}
