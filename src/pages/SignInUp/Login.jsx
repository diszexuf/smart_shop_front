import React, {useEffect, useState} from 'react';
import {Container, Form, Button, Col, Row, Alert} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const validate = () => {
        const errors = {};
        if (!formValues.username) {
            errors.username = 'Логин обязателен';
        }

        if (!formValues.password) {
            errors.password = 'Пароль обязателен';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            const url = 'https://localhost:8081/auth/login';
            const payload = {
                username: formValues.username,
                password: formValues.password,
            };
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();
                console.log("data", data);
                if (response.ok) {
                    localStorage.setItem('token', data.jwt);
                    // localStorage.setItem('role', data.user.authorities[0].authority);
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('userId', data.user.id);
                    setMessage({type: 'success', text: 'Вход выполнен успешно!'});
                    navigate('/profile');
                } else {
                    setMessage({type: 'danger', text: data.message || 'Неверный логин или пароль'});
                }
            } catch (error) {
                console.log(error)
                // setMessage({type: 'danger', text: 'Такой пользователь уже существует'});
            }
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (location.state?.showAlert) {
            setShowAlert(true);
        }
    }, [location.state]);

    return (
        <div>
            {showAlert && <Alert variant="warning">Пожалуйста, войдите в систему для добавления товаров в корзину!</Alert>}

            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <h2>Войти</h2>
                            {message && (
                                <Alert variant={message.type}>
                                    {message.text}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group>
                                    <Form.Label>Логин</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formValues.username}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formValues.password}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button className="mt-3" variant="primary" type="submit">
                                    Войти
                                </Button>
                                <Button
                                    className="mt-3 ml-3"
                                    variant="link"
                                    onClick={() => navigate('/register')}
                                >
                                    У меня нет аккаунта
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );
};

export default Login;
