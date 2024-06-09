import {useEffect, useState} from "react";
import {Button, Container, ListGroup, Form} from "react-bootstrap";
import {Box} from "@mui/material";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryTitle, setEditingCategoryTitle] = useState('');
    const [createCategoryTitle, setCreateCategoryTitle] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/categories/all_categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    function handleEditClick(category) {
        setEditingCategoryId(category.id);
        setEditingCategoryTitle(category.title);
    }

    function handleSaveClick(categoryId) {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/categories/${categoryId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: editingCategoryTitle })
                });

                if (response.ok) {
                    setCategories(categories.map(cat => cat.id === categoryId ? { ...cat, title: editingCategoryTitle } : cat));
                    setEditingCategoryId(null);
                    setEditingCategoryTitle('');
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }

    function handleCreateClick() {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/categories/save_category`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: createCategoryTitle })
                });

                if (response.ok) {
                    const newCategory = await response.json();
                    setCategories([...categories, newCategory]);
                    setCreateCategoryTitle('');
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }

    return (
        <Container className='m-5'>
            <h1 className='m-5'>Категории</h1>
            <Box>
                <Box className=' mb-3'>
                    <Form.Control
                        type="text"
                        id="inputCategory"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Введите название категории"
                        value={createCategoryTitle}
                        onChange={(e) => setCreateCategoryTitle(e.target.value)}
                    />

                    <Button className="mt-1 mb-3" onClick={handleCreateClick} variant='success'>Создать</Button>
                </Box>

                <ListGroup>
                    {categories.map((category) => (
                        <ListGroup.Item
                            key={category.id}
                            href={``}
                            className='d-flex justify-content-between'
                            style={{ cursor: 'pointer' }}
                        >
                            <Box className="d-flex align-items-center" style={{fontSize: 20, fontWeight: 'semibold'}}>
                                {editingCategoryId === category.id ? (
                                    <input
                                        type="text"
                                        value={editingCategoryTitle}
                                        onChange={(e) => setEditingCategoryTitle(e.target.value)}
                                    />
                                ) : (
                                    category.title
                                )}
                            </Box>
                            <Box>
                                {editingCategoryId === category.id ? (
                                    <Button variant='success' onClick={() => handleSaveClick(category.id)}>Сохранить</Button>
                                ) : (
                                    <>
                                        <Button variant='secondary' onClick={() => handleEditClick(category)}>Редактировать</Button>
                                        <Button variant="danger m-3">Удалить категорию</Button>
                                    </>
                                )}
                            </Box>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Box>
        </Container>
    )
}

export default CategoriesPage;
