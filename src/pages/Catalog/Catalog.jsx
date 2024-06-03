import {Container} from "react-bootstrap";
import PropTypes from "prop-types";
import './Catalog.css'
import {Box} from "@mui/material";
import SideBar from "./Components/SideBar.jsx";

function Catalog(props) {

    const {category, categoryId} = props;
    // const PRODUCTS = [
    //     {
    //         id: 1,
    //         model: 'Galaxy S21',
    //         brand: 'Samsung',
    //         price: 799
    //     },
    //     {
    //         id: 2,
    //         model: 'iPhone 12',
    //         brand: 'Apple',
    //         price: 999
    //     },
    //     {
    //         id: 3,
    //         model: 'Pixel 5',
    //         brand: 'Google',
    //         price: 699
    //     },
    //     {
    //         id: 4,
    //         model: 'OnePlus 9',
    //         brand: 'OnePlus',
    //         price: 729
    //     },
    //     {
    //         id: 5,
    //         model: 'Mi 11',
    //         brand: 'Xiaomi',
    //         price: 749
    //     },
    //     {
    //         id: 6,
    //         model: 'P40 Pro',
    //         brand: 'Huawei',
    //         price: 899
    //     },
    //     {
    //         id: 7,
    //         model: 'Xperia 5 II',
    //         brand: 'Sony',
    //         price: 949
    //     },
    //     {
    //         id: 8,
    //         model: 'Moto G Power',
    //         brand: 'Motorola',
    //         price: 249
    //     },
    //     {
    //         id: 9,
    //         model: 'Redmi Note 10',
    //         brand: 'Xiaomi',
    //         price: 199
    //     },
    //     {
    //         id: 10,
    //         model: 'Nord N10 5G',
    //         brand: 'OnePlus',
    //         price: 299
    //     }
    // ];


    return (
        <Container className='mt-5'>
            <h1 className='mb-5'>{category}</h1>
            <div className="d-flex">


                <Box className="sidebar">
                    <SideBar categoryIdSB={categoryId}/>
                </Box>
                <Box className="product-wrapper">
                    <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, ullam.</h1>
                </Box>


                {/*<h1>{category}</h1>*/}
                {/*{PRODUCTS.map((product) => (*/}
                {/*    <ProductCard*/}
                {/*        key={product.id}*/}
                {/*        model={product.model}*/}
                {/*        brand={product.brand}*/}
                {/*        price={product.price}*/}
                {/*    />*/}
                {/*))}*/}
            </div>
        </Container>
    )
}

Catalog.propTypes = {
    category: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
}

export default Catalog;