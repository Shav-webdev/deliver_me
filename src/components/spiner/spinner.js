import React from 'react'
import './spinner.css'

export default function Spinner() {
  return (
    <div className="spinner-ripple-loading">
      <div className="loading-spinner">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
