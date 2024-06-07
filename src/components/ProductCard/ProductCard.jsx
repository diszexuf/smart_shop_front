import {Button, Image} from "react-bootstrap";
import './ProductCard.css';
import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import examImg from '../../pages/Catalog/smart.jpg';
import { useState } from "react";

function ProductCard(props) {
    const { model, price, productId } = props;
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = () => {
        setQuantity(1);
        localStorage.setItem();
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
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
