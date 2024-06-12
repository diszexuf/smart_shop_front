import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({
        fullName: '',
        username: '',
        phone: '',
        email: '',
    });
    const navigate = useNavigate();
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        async function fetchUserData() {

            const userData = await fetchUserFromAPI();
            setUser({
                fullName: userData.fullName,
                username: userData.username,
                phone: userData.phone,
                email: userData.email,
            });
        }

        fetchUserData();
    }, []);

    async function fetchUserFromAPI() {
        try {
            const response = await fetch(`https://localhost:8081/api/v1/users/find_${localStorage.getItem('username')}`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Отправляемые данные пользователя:", JSON.stringify(user));
        try {
            const response = await fetch('https://localhost:8081/api/v1/users/update_user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    fullName: user.fullName,
                    username: user.username,
                    phone: user.phone,
                    email: user.email,
                })
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setShowAlertError(true);
            } else {
                setShowAlertError(true);
            }
        } catch (error) {
            setShowAlertError(true);
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');

        window.location.href = '/login';
    };

    return (
        <Container className='mt-3'>
            {showAlertSuccess && <Alert variant="success">Данные успешно обновлены</Alert>}
            {showAlertError && <Alert variant="danger">Произошла ошибка</Alert>}

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

            {/*<OrderList classname='mt-5' orders={orders}/>*/}
        </Container>
    );
}

export default Profile;
