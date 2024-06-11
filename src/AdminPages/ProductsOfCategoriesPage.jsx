import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Form, Modal } from "react-bootstrap";
import { Box } from "@mui/material";

function ProductsOfCategoriesPage({ categoryId }) {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingProductTitle, setEditingProductTitle] = useState('');
    const [newProductTitle, setNewProductTitle] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/products/filters?categoryId=${categoryId}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [categoryId]);

    function handleEditClick(product) {
        setEditingProductId(product.id);
        setEditingProductTitle(product.title);
    }

    function handleSaveClick(productId) {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: editingProductTitle })
                });

                if (response.ok) {
                    setProducts(products.map(prod => prod.id === productId ? { ...prod, title: editingProductTitle } : prod));
                    setEditingProductId(null);
                    setEditingProductTitle('');
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }

    function handleCreateClick() {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: newProductTitle, categoryId })
                });

                if (response.ok) {
                    const newProduct = await response.json();
                    setProducts([...products, newProduct]);
                    setNewProductTitle('');
                    setShowModal(false);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }

    function handleDeleteClick(productId) {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    setProducts(products.filter(prod => prod.id !== productId));
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }

    return (
        <Container>
            <h1 className='m-3'>Товары</h1>
            <Button variant="success" onClick={() => setShowModal(true)}>Добавить товар</Button>
            <ListGroup className="mt-3">
                {products.map((product) => (
                    <ListGroup.Item
                        key={product.id}
                        className='d-flex justify-content-between align-items-center'
                    >
                        <Box className="d-flex align-items-center" style={{ fontSize: 20, fontWeight: 'semibold' }}>
                            {editingProductId === product.id ? (
                                <input
                                    type="text"
                                    value={editingProductTitle}
                                    onChange={(e) => setEditingProductTitle(e.target.value)}
                                />
                            ) : (
                                product.title
                            )}
                        </Box>
                        <Box>
                            {editingProductId === product.id ? (
                                <Button variant='success' onClick={() => handleSaveClick(product.id)}>Сохранить</Button>
                            ) : (
                                <>
                                    <Button variant='secondary' onClick={() => handleEditClick(product)}>Редактировать</Button>
                                    <Button variant="danger m-3" onClick={() => handleDeleteClick(product.id)}>Удалить</Button>
                                </>
                            )}
                        </Box>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый товар</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Введите название товара"
                        value={newProductTitle}
                        onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Закрыть</Button>
                    <Button variant="success" onClick={handleCreateClick}>Создать</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProductsOfCategoriesPage;
