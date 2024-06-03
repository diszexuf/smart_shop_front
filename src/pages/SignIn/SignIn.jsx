import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./SignIn.css";


const SignIn = () => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await delay(500);
        console.log(`Username :${inputUsername}, Password :${inputPassword}`);
        if (inputUsername !== "admin" || inputPassword !== "admin") {
            setShow(true);
        }
        setLoading(false);
    };

    const handlePassword = () => {

    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <div
            className="sign-in__wrapper"
        >
            {/* Form */}
            <Form className="shadow-lg p-4 bg-white rounded" onSubmit={handleSubmit}>
                {/* Header */}
                <div className="h4 mb-2 text-center">Войти</div>
                {/* ALert */}
                {show ? (
                    <Alert
                        className="mb-2"
                        variant="danger"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        Неверное имя пользователя или пароль.
                    </Alert>
                ) : (
                    <div />
                )}
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type="text"
                        value={inputUsername}
                        placeholder="Имя пользователя"
                        onChange={(e) => setInputUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        value={inputPassword}
                        placeholder="Пароль"
                        onChange={(e) => setInputPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="checkbox">
                    <Form.Check type="checkbox" label="Запомнить меня" />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Войти
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Выполняется вход...
                    </Button>
                )}
                <div className="d-grid justify-content-end">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                        onClick={handlePassword}
                    >
                        Забыли пароль?
                    </Button>
                </div>
            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Made by Hendrik C | &copy;2022
            </div>
        </div>
    );
};

export default SignIn;
