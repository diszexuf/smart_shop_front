import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductForm({ show, onHide, onSubmit, productId }) {
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [specs, setSpecs] = useState([{ key: '', value: '' }]);

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
        setSpecs([...specs, { key: '', value: '' }]);
    };

    const handleRemoveSpec = (index) => {
        const newSpecs = [...specs];
        newSpecs.splice(index, 1);
        setSpecs(newSpecs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ image, price, title, specs });
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
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control type="number" value={price} onChange={handlePriceChange} />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" value={title} onChange={handleTitleChange} />
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
