import { Button, Col, Container, Form, Row } from "react-bootstrap";
import OrderList from "../../components/orderList/OrderList.jsx";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({
        fullName: '',
        username: '',
        phone: '',
        email: '',
    });
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate();
    //todo статус заказов
    //todo пикчи

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigator('/login')
        }
        async function fetchUserData() {
            const userData = await fetchUserFromAPI();
            setUser(userData);

            const userOrders = await fetchOrdersFromAPI();
            setOrders(userOrders);
        }

        fetchUserData();
    }, []);

    async function fetchUserFromAPI() {
        try {
            const response = await fetch(`https://localhost:8081/api/v1/users/find_${JSON.parse(localStorage.getItem('username'))}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchOrdersFromAPI() {
        try {
            const response = await fetch(`https://localhost:8081/users/find_${user.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const handleUpdateUser = async (updatedUser) => {
        setUser(updatedUser);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Здесь можно добавить логику для отправки обновленных данных пользователя на сервер
        await handleUpdateUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');

        window.location.href = '/login';
    };

    return (
        <Container className='mt-3'>
            <h2 className="my-4">Личный кабинет</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formName" className='m-3'>
                    <Form.Label column sm={2}>Имя</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={user.fullName || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUsername" className='m-3'>
                    <Form.Label column sm={2}>Логин</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="username"
                            value={user.username || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmail" className='m-3'>
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            name="email"
                            value={user.email || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone" className='m-3'>
                    <Form.Label column sm={2}>Телефон</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={user.phone || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Сохранить изменения
                </Button>
            </Form>
            <Button className="mt-3" variant="secondary" onClick={handleLogout}>
                Выйти
            </Button>

            <OrderList classname='mt-5' orders={orders}/>
        </Container>
    );
}

export default Profile;
