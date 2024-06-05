import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState(null);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const validate = () => {
        const errors = {};
        if (!formValues.email) {
            errors.email = 'Электронная почта обязательна';
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = 'Неверный формат электронной почты';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            // Вы можете отправить запрос на сервер здесь
            // Например, используя fetch или axios
            console.log('Form data', formValues);
            setMessage({ type: 'success', text: 'Форма успешно отправлена!' });
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

    const handleGoogleLogin = () => {
        // Перенаправление пользователя на страницу входа Google OAuth 2.0
        window.location.href = 'http://localhost:5173/api/v1/users/secured';
    };

    useEffect(() => {
        axios.get('https://localhost:8081/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Error fetching user", error);
            });
    }, []);

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
                            <Form.Group controlId="formEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formPassword">
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
                        <hr />
                        <Button className="mt-3" variant="danger" onClick={handleGoogleLogin}>
                            Войти через Google
                        </Button>
                        {user && (
                            <div className="mt-3">
                                <h3>Добро пожаловать, {user.name}</h3>
                                <p>Email: {user.email}</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignIn;
