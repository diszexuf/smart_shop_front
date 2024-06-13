import React from 'react';

function OrderList({ orders }) {
    return (
        <div>
            <h2 className='m-5'>Ваши заказы</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        <p>Номер заказа: {order.id}</p>
                        <p>Дата: {order.orderDate}</p>
                        <p>Статус: {order.orderStatus}</p>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default OrderList;
