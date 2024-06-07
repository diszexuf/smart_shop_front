import { Button, Image } from "react-bootstrap";
import './ProductCard.css';
import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import examImg from '../../pages/Catalog/smart.jpg';
import { useState } from "react";

function ProductCard(props) {
    const { model, price, productId } = props;
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        const newQuantity = 1;
        setQuantity(newQuantity);
        console.log(newQuantity);

        const cartArr = JSON.parse(localStorage.getItem('cart'));

        cartArr.push({
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
        const cartArr = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cartArr.findIndex(item => item.productTitle === model);

        if (productIndex !== -1) {
            cartArr[productIndex].productQuantity = newQuantity;
        } else {
            cartArr.push({
                productTitle: model,
                productPrice: price,
                productQuantity: newQuantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartArr));
    };

    return (
        <>
            <Box className="card">
                <Box className="card__top">
                    <a href="/" className="card__image">
                        <Image src={examImg} className='card-img' alt='product image' />
                    </a>
                </Box>
                <Box className="card__bottom">
                    <a href="#" className="card__title">
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
        </>
    );
}

ProductCard.propTypes = {
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
};

export default ProductCard;
