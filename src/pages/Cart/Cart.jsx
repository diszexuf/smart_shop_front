import {Button, Container, Overlay, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {useRef, useState} from "react";

function Cart() {

    const [showOverlay, setShowOverlay] = useState(false);
    const target = useRef(null);

    // const cartProducts = JSON.parse(localStorage.getItem('cart'));
    const cartProducts = [
        {
            productTitle: 'Product 1',
            productPrice: 45000,
            productQuantity: 5
        },
        {
            productTitle: 'Product 2',
            productPrice: 47000,
            productQuantity: 3
        },
        {
            productTitle: 'Product 3',
            productPrice: 60000,
            productQuantity: 2
        }
    ];

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(cartProducts.productQuantity);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => {
            return prevQuantity + 1;
        });
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => {
            return prevQuantity > 0 ? prevQuantity - 1 : 0;
        });
    };

    function handleCreateOrder() {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
        } else {
            createOrder();
        }
    }

    function createOrder() {
        const orderItems = JSON.parse(localStorage.getItem('cart'));
        console.log('item get', orderItems);

        localStorage.setItem('cart', JSON.stringify([]));


    }


    return (
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
                        <td className='d-flex justify-content-around align-items-center'>
                            <Button className="decrement" onClick={decrementQuantity}>-</Button>
                            <span className="quantity m-3">{elem.productQuantity}</span>
                            <Button className="increment" onClick={incrementQuantity}>+</Button>
                        </td>
                        <td>{parseInt(elem.productPrice) * parseInt(elem.productQuantity)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="create-order-place d-flex justify-content-center">
                <Button ref={target} variant="success" onClick={handleCreateOrder}>
                    Оформить заказ
                </Button>
                <Overlay target={target.current} show={showOverlay} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example">
                            Зарегистрируйтесь или войдите в аккаунт
                        </Tooltip>
                    )}
                </Overlay>
            </div>
        </Container>

    )
}


export default Cart;