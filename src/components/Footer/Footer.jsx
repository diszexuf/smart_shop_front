import {Container, Row, Col} from 'react-bootstrap';


function Footer() {
    return (
        <footer className="footer-site bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>MyShop</h5>
                        <p>Мы предоставляем лучшие товары по доступным ценам.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Контакты</h5>
                        <ul className="list-unstyled">
                            <li>Адрес: Улица пр. Ленина, д. 132, Челябинск</li>
                            <li>Телефон: +7 (495) 123-45-67</li>
                            <li>Email: info@smartshop.com</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Полезные ссылки</h5>
                        <ul className="list-unstyled">
                            <li><a href="/policy" className="text-white">Политика конфиденциальности</a></li>
                            <li><a href="#terms" className="text-white">Условия использования</a></li>
                            <li><a href="#support" className="text-white">Поддержка</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12} className="text-center">
                        <p>© 2024 MyShop. Все права защищены.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
