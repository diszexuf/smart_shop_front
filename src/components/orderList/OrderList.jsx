import React from 'react';

function OrderList({ orders }) {
    return (
        <div>
            <h2>Ваши заказы</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>
                        <p>Номер заказа: {order.id}</p>
                        <p>Дата: {order.date}</p>
                        <p>Статус: {order.status}</p>
                        <p>Сумма: {order.total} руб.</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;
