import React, { useState } from 'react'
import { Rate } from 'antd'

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export default function OrderRate({ getOrderRate, defaultRate, isOrderRated }) {
  const [rate, setRate] = useState(0)

  const handleChange = rate => {
    setRate(rate)
    getOrderRate(rate)
  }

  const onRateHandleClick = e => {
    e.stopPropagation()
  }

  return (
    <span onClick={onRateHandleClick}>
      <Rate
        disabled={isOrderRated}
        defaultValue={defaultRate}
        tooltips={desc}
        onChange={handleChange}
        value={defaultRate}
      />
    </span>
  )
}
