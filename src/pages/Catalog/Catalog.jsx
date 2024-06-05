import {Container} from "react-bootstrap";
import PropTypes from "prop-types";
import './Catalog.css'
import {Box} from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.jsx";
import ProductCard from '../../components/ProductCard/ProductCard.jsx'

function Catalog(props) {

    const {category, categoryId} = props;

    return (
        <Container className='mt-5 min-vh-100'>
            <h1 className='mb-5'>{category}</h1>
            <div className="d-flex">


                <Box className="sidebar">
                    <SideBar categoryIdSB={categoryId}/>
                </Box>
                <Box className="product-wrapper">
                    {/*{PRODUCTS.map((product) => (*/}
                    {/*    <ProductCard*/}
                    {/*        key={product.id}*/}
                    {/*        model={product.model}*/}
                    {/*        brand={product.brand}*/}
                    {/*        price={product.price}*/}
                    {/*    />*/}
                    {/*))}*/}

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