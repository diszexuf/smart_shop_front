import React, {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

function ProductForm({show, onHide, onSubmit, product, category}) {
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [specs, setSpecs] = useState([{key: '', value: ''}]);
    const navigate = useNavigate();


    function unautorizedAction() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    }

    useEffect(() => {
        async function fetchProduct() {
            if (product) {
                try {
                    const response = await fetch(`https://localhost:8081/api/v1/products/get_${product}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setPrice(data.price);
                        setTitle(data.title);
                    } else if (response.status === 401) {
                        unautorizedAction();
                    } else {
                        console.error('Ошибка при получении товара:', response.status);
                    }
                } catch (error) {
                    console.error('Ошибка при подключении к серверу:', error);
                }
            } else {
                resetForm();
            }
        }

        fetchProduct();
    }, [product]);

    useEffect(() => {
        async function fetchSpec() {
            if (product) {
                try {
                    const response = await fetch(`https://localhost:8081/api/v1/products/specs_${product}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setSpecs(Object.entries(data).map(([key, value]) => ({ key, value })));
                    } else if (response.status === 401) {
                        unautorizedAction();
                    } else {
                        console.error('Ошибка при получении характеристик товара:', response.status);
                    }
                } catch (error) {
                    console.error('Ошибка при подключении к серверу:', error);
                }
            } else {
                resetForm();
            }
        }

        fetchSpec();
    }, [product]);




    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSpecChange = (index, key, value) => {
        const newSpecs = [...specs];
        newSpecs[index][key] = value;
        setSpecs(newSpecs);
    };

    const handleAddSpec = () => {
        setSpecs([...specs, {key: '', value: ''}]);
    };

    const handleRemoveSpec = (index) => {
        const newSpecs = [...specs];
        newSpecs.splice(index, 1);
        setSpecs(newSpecs);
    };

    const resetForm = () => {
        setImage(null);
        setPrice('');
        setTitle('');
        setSpecs([{key: '', value: ''}]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        } else {

        }
        formData.append('product', new Blob([JSON.stringify({price, title})], {type: 'application/json'}));

        if (product) {
            formData.append('id', product);
        }

        const specsMap = specs.reduce((map, spec) => {
            map[spec.key] = spec.value;
            return map;
        }, {});

        formData.append('specs', new Blob([JSON.stringify(specsMap)], {type: 'application/json'}));
        formData.append('categoryId', category);

        try {
            const response = await fetch('https://localhost:8081/api/v1/products/save_product', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                onSubmit(data);
                resetForm();
            } else if (response.status === 401) {
                unautorizedAction();
            } else {
                console.error('Ошибка при сохранении товара:', response.status);
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }

        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="image">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange}/>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control type="number" value={price} onChange={handlePriceChange}/>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" value={title} onChange={handleTitleChange}/>
                    </Form.Group>
                    <Form.Group controlId="specs">
                        <Form.Label>Характеристики</Form.Label>
                        {specs.map((spec, index) => (
                            <div key={index} className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder="Ключ"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                                    className="mr-2"
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Значение"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                    className="mr-2"
                                />
                                <Button variant="danger" onClick={() => handleRemoveSpec(index)}>
                                    Удалить
                                </Button>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={handleAddSpec}>
                            Добавить характеристику
                        </Button>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ProductForm;
