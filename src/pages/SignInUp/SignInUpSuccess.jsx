import {Container} from "react-bootstrap";

function SignInUpSuccess() {
    const {actionType} = props;

    return(
        <Container className='d-flex justify-content-center align-items-center min-vh-100'>
            <h1>{actionType === 'signUp' ? 'Регистрация' : 'Авторизация'} прошла успешно</h1>
        </Container>
    )
}

export default SignInUpSuccess;