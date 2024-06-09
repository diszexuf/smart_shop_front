import {Container} from "react-bootstrap";
import PropTypes from "prop-types";
import './Catalog.css'
import {Box} from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.jsx";
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import {useState} from "react";

function Catalog(props) {
    const {category, categoryId} = props;
    const [products, setProducts] = useState([]);

    async function handleProductFilterChange(data) {
        setProducts(data);
    }

    return (
        <Container className='mt-5 min-vh-100'>
            <h1 className='mb-5'>{category}</h1>
            <div className="d-flex">
                <Box className="sidebar">
                    <SideBar categoryIdSB={categoryId} onHandleProductChange={handleProductFilterChange}/>
                </Box>
                <div></div>
                <Box className="product-wrapper">
                    {products.length !== 0 ? products.map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                            model={product.title}
                            price={product.price}
                        />
                    )) : <div>Список товаров пуст</div>}
                </Box>
            </div>
        </Container>
    )
}

Catalog.propTypes = {
    category: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
}

export default Catalog;
