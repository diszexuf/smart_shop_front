import {Container, Image} from "react-bootstrap";
import './ProductCard.css'
import PropTypes from 'prop-types';
import {Box} from "@mui/material";
import examImg from '../adresses_pic.svg'


function ProductCard(props) {
    const {model, brand, price} = props;

    return (
        <Container>
            <Box className="card">
                <Image src={examImg} className='card-img' alt='product iamge'/>
                <h1>{brand}</h1>
                <h1>{model}</h1>
                <h1>{price}</h1>
            </Box>

        </Container>
    );
}

ProductCard.propTypes = {
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};


export default ProductCard;
