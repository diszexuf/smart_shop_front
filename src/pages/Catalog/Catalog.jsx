import {Button, Container, NavLink} from "react-bootstrap";
import PropTypes from "prop-types";
import './Catalog.css'
import {Box} from "@mui/material";
import SideBar from "../../components/SideBar/SideBar.jsx";
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import {useState} from "react";
import ProductForm from "../../components/ProductForm/ProductForm.jsx";
import {useNavigate} from "react-router-dom";

function Catalog(props) {
    const {category, categoryId} = props;
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const navigate = useNavigate();

    function unautorizedAction() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    }

    const handleAddProduct = () => {
        setCurrentProductId(null);
        setShowModal(true);
    };

    const handleEditProduct = (productId) => {
        setCurrentProductId(productId);
        setShowModal(true);
    };

    const handleSubmit = (product) => {
        if (currentProductId) {
            // редактирование существующего товара
            const updatedProducts = products.map((p) => (p.id === currentProductId.id ? product : p));
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

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`https://localhost:8081/api/v1/products/delete_${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setProducts(products.filter(product => product.id !== productId));
            } else if (response.status === 401) {
                unautorizedAction();
            } else {
                console.error('Ошибка при удалении товара');
            }
        } catch (error) {
            console.error('Ошибка при подключении к серверу:', error);
        }
    };

    const handleEdit = (productId) => {

    };

    return (
        <Container className='mt-5 min-vh-100'>

            <ProductForm
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleSubmit}
                product={currentProductId}
                category={categoryId}
            />
            <div className='d-flex justify-content-between'>
                <h1 className='mb-5'>{category}</h1>
                {localStorage.getItem('role') === 'ADMIN' && (
                <div className='text-end'>
                    <Button className='m-2' variant="success" onClick={handleAddProduct}>
                        Добавить товар
                    </Button>
                </div>)
                }
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
                            image={product.image}
                            onDelete={handleDelete}
                            onEdit={handleEditProduct}
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
