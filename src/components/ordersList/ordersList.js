import React from 'react'
import Spinner from '../spiner/spinner'
import List from 'antd/es/list'

export default function OrdersList(props) {
  return (
    <List className="company_orders_list_wrapper">
      {props.loading ? (
        <Spinner />
      ) : props.filterBy ? (
        props.orders
          .filter(el => el.state === props.filterBy)
          .map(el => {
            return (
              <List.Item className="orders_list_item" key={el.id}>
                <div>
                  <p>
                    <strong>Order :</strong>
                    {el.order_description}
                  </p>
                  <p>
                    <strong>Money :</strong>
                    {el.points}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Take address :</strong>
                    {el.take_address}
                  </p>
                  <p>
                    <strong>Deliver address :</strong>
                    {el.deliver_address}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Status :</strong>
                    {el.state}
                  </p>
                </div>
              </List.Item>
            )
          })
      ) : (
        props.orders.map(el => {
          return (
            <List.Item className="orders_list_item" key={el.id}>
              <div>
                <p>
                  <strong>Order :</strong>
                  {el.order_description}
                </p>
                <p>
                  <strong>Money :</strong>
                  {el.points}
                </p>
              </div>
              <div>
                <p>
                  <strong>Take address :</strong>
                  {el.take_address}
                </p>
                <p>
                  <strong>Deliver address :</strong>
                  {el.deliver_address}
                </p>
              </div>
              <div>
                <p>
                  <strong>Status :</strong>
                  {el.state}
                </p>
              </div>
            </List.Item>
          )
        })
      )}
    </List>
  )
}
