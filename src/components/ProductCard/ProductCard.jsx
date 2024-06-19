import {Alert, Button, Image, ListGroup, Modal, Table} from "react-bootstrap";
import './ProductCard.css';
import PropTypes from 'prop-types';
import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function ProductCard(props) {
    const {model, price, productId, onDelete, onEdit, image} = props;
    const [quantity, setQuantity] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [productSpecs, setProductSpecs] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            const cartArr = JSON.parse(cart);
            const productInCart = cartArr.find(item => item.productId === productId);
            if (productInCart) {
                setQuantity(productInCart.productQuantity);
            }
        }
    }, [productId]);

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login', {state: {showAlert: true}});
            return;
        }

        const newQuantity = 1;
        setQuantity(newQuantity);

        const cart = localStorage.getItem('cart');
        const cartArr = cart ? JSON.parse(cart) : [];

        cartArr.push({
            productId,
            productTitle: model,
            productPrice: price,
            productQuantity: newQuantity
        });

        localStorage.setItem('cart', JSON.stringify(cartArr));
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            updateCartQuantity(newQuantity);
            return newQuantity;
        });
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
            updateCartQuantity(newQuantity);
            return newQuantity;
        });
    };

    const updateCartQuantity = (newQuantity) => {
        const cart = localStorage.getItem('cart');
        const cartArr = cart ? JSON.parse(cart) : [];
        const productIndex = cartArr.findIndex(item => item.productId === productId);

        if (productIndex !== -1) {
            if (newQuantity === 0) {
                cartArr.splice(productIndex, 1);
            } else {
                cartArr[productIndex].productQuantity = newQuantity;
            }
        } else {
            cartArr.push({
                productId,
                productTitle: model,
                productPrice: price,
                productQuantity: newQuantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartArr));
    };

    useEffect(() => {
        async function fetchSpecs() {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/products/specs_${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProductSpecs(data);
                } else {
                    console.error('Ошибка при загрузке категорий');
                }
            } catch (error) {
                console.error('Ошибка при подключении к серверу:', error);
            }
        }

        fetchSpecs();
    }, [productId]);

    const handleModalOpen = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <Box>
                <Box className="card">
                    <Box className="card__top p-3">
                        <a href={location.pathname.concat(`/${productId}`)} className="card__image"
                           onClick={handleModalOpen}>
                            <Image src={`https://localhost:8081${image}`} className='card-img' alt='product image'/>
                        </a>
                    </Box>
                    <Box className="card__bottom">
                        <a href={location.pathname.concat(`/${productId}`)} className="card__title"
                           onClick={handleModalOpen}>
                            {model}
                        </a>
                        <Box className="card__prices">
                            <Box className="card__price">Цена: {price}</Box>
                        </Box>
                        {quantity === 0 ? (
                            <button className="card__add" onClick={handleAddToCart}>В корзину</button>
                        ) : (
                            <Box className="quantity-controls d-flex justify-content-center align-items-center">
                                <Button className="decrement" onClick={decrementQuantity}>-</Button>
                                <span className="quantity m-3">{quantity}</span>
                                <Button className="increment" onClick={incrementQuantity}>+</Button>
                            </Box>
                        )}
                    </Box>
                </Box>
                {localStorage.getItem('role') === 'ADMIN' && (
                    <div className=''>
                        <Button variant="danger" className='w-50'
                                onClick={() => onDelete(productId)}><DeleteIcon/></Button>
                        <Button variant="primary" className='w-50'
                                onClick={() => onEdit(productId)}><EditIcon/></Button>
                    </div>
                )}

            </Box>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={`https://localhost:8081${image}`} className='card-img' alt='product image'/>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <p style={{fontWeight: "bold", fontSize: 20}}>Цена: {price}</p>
                    </Box>
                    {quantity === 0 ? (
                        <button className="card__add" onClick={handleAddToCart}>В корзину</button>
                    ) : (
                        <Box className="quantity-controls">
                            <Button className="decrement" onClick={decrementQuantity}>-</Button>
                            <span className="quantity m-3">{quantity}</span>
                            <Button className="increment" onClick={incrementQuantity}>+</Button>
                        </Box>
                    )}

                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center align-items-center'>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Характеристика</th>
                            <th>Значение</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(productSpecs).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ProductCard.propTypes = {
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
};

export default ProductCard;
