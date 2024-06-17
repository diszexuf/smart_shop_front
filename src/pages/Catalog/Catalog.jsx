import {Button, Container, NavLink} from "react-bootstrap";
import PropTypes from "prop-types";
import './Catalog.css'
import {Box} from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.jsx";
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import {useState} from "react";
import ProductForm from "../../components/ProductForm.jsx";

function Catalog(props) {
    const {category, categoryId} = props;
    const [products, setProducts] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (productId) => {
        const product = products.find((p) => p.id === productId);
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleSubmit = (product) => {
        if (currentProduct) {
            // редактирование существующего товара
            const updatedProducts = products.map((p) => (p.id === currentProduct.id ? product : p));
            setProducts(updatedProducts);
        } else {
            // добавление нового товара
            setProducts([...products, product]);
        }
        setShowModal(false);
    };

    async function handleProductFilterChange(data) {
        setProducts(data);
    }

    const handleDelete = (productId) => {
        // действия по удалению товара
    };

    const handleEdit = (productId) => {

    };

    return (
        <Container className='mt-5 min-vh-100'>

            <ProductForm
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleSubmit}
                product={currentProduct}
            />
            <div className='d-flex justify-content-between'>
                <h1 className='mb-5'>{category}</h1>
                <div className='text-end'>
                    <Button className='m-2' variant="success" onClick={handleAddProduct}>
                        Добавить товар
                    </Button>
                </div>
            </div>

            <div className="d-flex">
                <Box className="sidebar">
                    <SideBar categoryIdSB={categoryId} onHandleProductChange={handleProductFilterChange}/>
                </Box>
                <Box className="product-wrapper">
                    {products.length !== 0 ? products.map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                            model={product.title}
                            price={product.price}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )) : <div>Список товаров пуст</div>}
                </Box>
            </div>


        </Container>
    )
}

Catalog.propTypes = {
    category: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired,
}

export default Catalog;
