import {Image} from "react-bootstrap";
import './ProductCard.css'
import PropTypes from 'prop-types';
import {Box} from "@mui/material";
import examImg from '../../pages/Catalog/smart.jpg'


function ProductCard(props) {
    const {model, price} = props;

    return (
        <>
            <Box className="card">
                <Box className="card__top">
                    <a href="#" className="card__image">
                        <Image src={examImg} className='card-img' alt='product iamge'/>
                    </a>
                </Box>
                <Box className="card__bottom">
                    <Box className="card__prices">
                        <Box className="card__price">Цена: {price}</Box>
                    </Box>
                    <a href="#" className="card__title">
                        {model}
                    </a>
                    <button className="card__add">В корзину</button>
                </Box>
            </Box>
        </>
    );
}

ProductCard.propTypes = {
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};


export default ProductCard;
