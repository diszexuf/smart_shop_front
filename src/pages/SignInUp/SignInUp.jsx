import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignInUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [user, setUser] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
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
        } else if (formValues.password.length < 6) {
            errors.password = 'Пароль должен быть не менее 6 символов';
        }

        if (!isLogin && formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = 'Пароли должны совпадать';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {

            const url = isLogin ? 'https://localhost:8081/auth/login' : 'https://localhost:8081/auth/register';
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

                console.log(data.user);

                if (response.ok && localStorage.getItem('token')) {
                    localStorage.setItem('token', JSON.stringify(data.token));
                    console.log(data.token);
                    setUser(data.user);
                    setMessage({ type: 'success', text: isLogin ? 'Вход выполнен успешно!' : 'Регистрация прошла успешно!' });
                    navigate('/profile');
                } else {
                    setMessage({ type: 'danger', text: data.message || 'Неверный логин или пароль' });
                }
            } catch (error) {
                setMessage({ type: 'danger', text: 'Произошла ошибка при подключении к серверу' });
            }
            setFormErrors({});
        } else {
            setFormErrors(errors);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormErrors({});
        setMessage(null);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h2>{isLogin ? 'Войти' : 'Регистрация'}</h2>
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

                            {!isLogin && (
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Подтвердите пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formValues.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}

                            <Button className="mt-3" variant="primary" type="submit">
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                            <Button
                                className="mt-3 ml-3"
                                variant="link"
                                onClick={toggleMode}
                            >
                                {isLogin ? 'У меня нет аккаунта' : 'У меня уже есть аккаунт'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignInUp;
