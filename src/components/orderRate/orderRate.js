import React, { useState } from 'react'
import { Rate } from 'antd'

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export default function OrderRate({ getOrderRate, defaultRate }) {
  const [rate, setRate] = useState(defaultRate)

  console.log(rate)
  console.log(typeof rate)

  console.log('default', typeof defaultRate)

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
        defaultValue={defaultRate}
        tooltips={desc}
        onChange={handleChange}
        value={rate}
      />
    </span>
  )
}
