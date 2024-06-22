import {Navbar, Nav, Form, FormControl, Container, Dropdown, Button} from 'react-bootstrap';
import {ShoppingCart, Person} from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Map';
import {useEffect, useState} from "react";

function Header({categories}) {
    const [profileLink, setProfileLink] = useState('/login');
    const [cartLink, setCartLink] = useState('/login');
    const [editCategories, setEditCategories] = useState({});


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setProfileLink('/profile');
            setCartLink('/cart')
        } else {
            setProfileLink('/login');
            setCartLink('/login')
        }

        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
            setEditCategories({
                title: "Редактировать категории",
                url: "/admin/all_categories"
            })
        }
    }, []);


    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/">SmartShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-categories">
                                    Категории
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {categories.map(category => (
                                        <Dropdown.Item key={category.id} href={`/catalog_${category.id}`}>
                                            {category.title}
                                        </Dropdown.Item>
                                    ))}
                                    {Object.keys(editCategories).length !== 0 && (
                                        <>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item href={editCategories.url}>
                                                {editCategories.title}
                                            </Dropdown.Item>
                                        </>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>


                        <Nav className='d-flex align-items-center'>
                            <Nav.Link href="/addresses">
                                <MapIcon/>
                            </Nav.Link>
                            <Nav.Link href={cartLink}>
                                <ShoppingCart/>
                            </Nav.Link>
                            <Nav.Link href={profileLink}>
                                <Person/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </>
    );
}

export default Header;
