import React, { useState } from 'react'
import { Rate } from 'antd'

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export default function OrderRate({ getOrderRate }) {
  const [rate, setRate] = useState(1)

  const handleChange = rate => {
    setRate(rate)
    getOrderRate(rate)
  }

  const onRateHandleClick = e => {
    e.stopPropagation()
  }

  return (
    <span onClick={onRateHandleClick}>
      <Rate tooltips={desc} onChange={handleChange} value={rate} />
    </span>
  )
}
