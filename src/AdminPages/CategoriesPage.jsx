import {useEffect, useState} from "react";
import {Button, Container, ListGroup, Form} from "react-bootstrap";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

function CategoriesPage({ onCategoryAdded, onCategoryUpdated }) {
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryTitle, setEditingCategoryTitle] = useState('');
    const [createCategoryTitle, setCreateCategoryTitle] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/categories/all_categories`);
                const data = await response.json();
                setCategories(data);
                if (response.status === 401) {
                    unautorizedAction();
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    function handleEditClick(category) {
        setEditingCategoryId(category.id);
        setEditingCategoryTitle(category.title);
    }

    function unautorizedAction() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/login');
    }

    function handleSaveClick(categoryId) {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/categories/${categoryId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ title: editingCategoryTitle })
                });

                if (response.ok) {
                    setCategories(categories.map(cat => cat.id === categoryId ? { ...cat, title: editingCategoryTitle } : cat));
                    setEditingCategoryId(null);
                    setEditingCategoryTitle('');
                } else if (response.status === 401) {
                    unautorizedAction();
                } else {
                    console.log('Ошибка при сохранении категории:', response.status, response.statusText);
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
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ title: createCategoryTitle })
                });

                if (response.ok) {
                    const newCategory = await response.json();
                    setCategories([...categories, newCategory]);
                    setCreateCategoryTitle('');
                } else if (response.status === 401) {
                    unautorizedAction();
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }

    function handleDeleteClick(categoryId) {
        (async () => {
            try {
                const response = await fetch(`https://localhost:8081/api/v1/categories/delete_${categoryId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    setCategories(categories.filter(cat => cat.id !== categoryId));
                } else if (response.status === 401) {
                    unautorizedAction();
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
                                        <Button variant="danger m-3" onClick={() => handleDeleteClick(category.id)}>Удалить категорию</Button>
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
