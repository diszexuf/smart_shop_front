function Cart() {

    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    return(
        <Container className='min-vh-100 mt-3'>
            <h1>Корзина</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Модель</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                </tr>
                </thead>
                <tbody>
                {cartProducts.map(elem => (
                    <tr key={elem.productTitle}>
                        <td>{elem.productTitle}</td>
                        <td>{elem.productPrice}</td>
                        <td>{elem.productQuantity}</td>
                        <td>{parseInt(elem.productPrice) * parseInt(elem.productQuantity)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>

    )
}

import {Container, Table} from "react-bootstrap";

export default Cart;