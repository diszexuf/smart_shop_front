import React from 'react';
import { Table } from 'react-bootstrap';
import { format } from 'date-fns';

function OrderList({ orders }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd.MM.yyyy HH:mm:ss');
    };

    return (
        <div>
            <h2 className='m-5'>Ваши заказы</h2>
            {orders.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Дата</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.id}</td>
                            <td>{formatDate(order.orderDate)}</td>
                            <td>{order.orderStatus}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <div className='m-5' style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                    Заказов нет
                </div>
            )}
        </div>
    );
}

export default OrderList;
