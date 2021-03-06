import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order, i) => {
    return (
      <div className="order" id={order.id} key={Date.now()}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section className="ordersContainer">
      <h3>Placed Orders</h3>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;