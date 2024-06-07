import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UserProfile = ({ user, onUpdateUser, onLogout }) => {
    const [formValues, setFormValues] = useState(user);

    useEffect(() => {
        setFormValues(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(formValues);
    };

    return (
        <Container>
            <h2 className="my-4">Личный кабинет</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm={2}>Имя</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formValues.name || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formValues.email || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column sm={2}>Телефон</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formValues.phone || ''}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Сохранить изменения
                </Button>
            </Form>
            <Button className="mt-3" variant="secondary" onClick={onLogout}>
                Выйти
            </Button>
        </Container>
    );
};

export default UserProfile;
