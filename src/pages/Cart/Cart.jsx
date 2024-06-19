import {Button, Container, Overlay, Table, Toast, ToastContainer} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const target = useRef(null);
    const [sum, setSum] = useState(0);
    const navigate = useNavigate();
    const cartProducts = JSON.parse(localStorage.getItem('cart')) ||[];
    const [products, setProducts] = useState(cartProducts);

    useEffect(() => {
        calculateSum(); // Вычисление суммы при изменении корзины
    }, [products]);

    const calculateSum = () => {
        const total = products.reduce((acc, product) => acc + product.productPrice * product.productQuantity, 0);
        setSum(total);
    };

    const incrementQuantity = (index) => {
        const newProducts = [...products];
        newProducts[index].productQuantity += 1;
        setProducts(newProducts);
        localStorage.setItem('cart', JSON.stringify(newProducts));
    };

    const decrementQuantity = (index) => {
        const newProducts = [...products];
        newProducts[index].productQuantity = newProducts[index].productQuantity > 0 ? newProducts[index].productQuantity - 1 : 0;
        setProducts(newProducts);
        localStorage.setItem('cart', JSON.stringify(newProducts));
    };

    const handleDelete = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
        localStorage.setItem('cart', JSON.stringify(newProducts));
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

    async function createOrder() {
        const orderItems = JSON.parse(localStorage.getItem('cart'));
        const orderArr = orderItems.map(item => ({
            productId: item.productId,
            quantity: item.productQuantity
        }));
        const userID = JSON.parse(localStorage.getItem('userId'));

        const orderBody = JSON.stringify({
            userId: userID,
            orderDate: new Date().toISOString(),
            orderStatus: "В обработке",
            orderItems: orderArr
        });

        try {
            const response = await fetch('https://localhost:8081/api/v1/orders/save_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: orderBody
            });

            if (response.ok) {
                localStorage.setItem('cart', JSON.stringify([]));
                setProducts([]);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } else {
                console.log('Ошибка');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className='min-vh-100 mt-3'>
            <h1>Корзина</h1>
            {products.length ?
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Модель</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Стоимость</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((elem, index) => (
                        <tr key={elem.productTitle}>
                            <td>{elem.productTitle}</td>
                            <td>{elem.productPrice}</td>
                            <td className='d-flex justify-content-around align-items-center'>
                                <Button className="decrement" onClick={() => decrementQuantity(index)}>-</Button>
                                <span className="quantity m-3">{elem.productQuantity}</span>
                                <Button className="increment" onClick={() => incrementQuantity(index)}>+</Button>
                            </td>
                            <td>{parseInt(elem.productPrice) * parseInt(elem.productQuantity)}</td>
                            <td className={'d-flex justify-content-center align-items-center'}>
                                <DeleteIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => handleDelete(index)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                : <div className={'d-flex justify-content-center align-items-center m-5'}
                       style={{fontSize: 24, fontWeight: "bold"}}>Корзина пуста</div>}

            <div className="total-sum mt-3 d-flex justify-content-end">
                <h3>Общая сумма: {sum} руб.</h3>
            </div>

            <div className="create-order-place d-flex justify-content-center">
                <Button ref={target} variant="success" onClick={handleCreateOrder} disabled={products.length === 0}>
                    Оформить заказ
                </Button>
                <Overlay target={target.current} show={showOverlay} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                            Зарегистрируйтесь или войдите в аккаунт
                        </Tooltip>
                    )}
                </Overlay>
            </div>

            <ToastContainer position="top-center" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Успех</strong>
                    </Toast.Header>
                    <Toast.Body>Ваш заказ был успешно оформлен!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default Cart;
