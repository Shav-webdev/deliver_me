import React from 'react'
import "./cardUser.css"
import { socket } from '../../services/socket'
function CardUser({ data, takeOrder, user, getActiveOrders }) {
    const { points, id, take_address, deliver_address, receiver_name, receiver_phone, company_name, order_description } = data


    const handleTakeOrder = () => {
        takeOrder({
            id: id,
            state: "pending",
            userId: user.id
        })
        socket.emit('user_take_order', { userId: user.id })
    }
    return (
        <div className="card-container">
            <div className="item-box">
                <div className="card-item">
                    <p className="order"><strong>Order:</strong><span> {order_description} </span></p>
                    <p className="money"><strong>Money:</strong> <span> {points}</span></p>
                </div>
                <div className="card-item">
                    <p className="deliverer"><strong>Company:</strong> <span> {company_name}</span> </p>
                    <p className="deliverer-phone"><strong>Receiver Phone:</strong> <span>{receiver_phone}</span></p>
                </div>
            </div>
            <div className="item-box">
                <div className="card-item">
                    <p className="take-address"><strong>Take Addres:</strong> <span> {take_address}</span> </p>
                    <p className="deliver-address"><strong>Deliver Address:</strong> <span> {deliver_address} </span></p>
                </div>
                <div className="card-item">
                    <p className="status"><strong>Reciever Name:</strong> <span> {receiver_name} </span></p>
                    <button type="button" id="btn" className="delete-button"
                        onClick={handleTakeOrder}>Take</button>
                </div>
            </div>
        </div>
    )
}

export default CardUser
