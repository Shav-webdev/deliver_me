import React from 'react'

export default function Wallet({ wallet }) {
  return (
    <div className="wallet_wrapper">
      <strong>Wallet : </strong>
      <span>{wallet}</span>
    </div>
  )
}
