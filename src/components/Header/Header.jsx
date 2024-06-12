import {Navbar, Nav, Form, FormControl, Container, Dropdown} from 'react-bootstrap';
import {ShoppingCart, Person} from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Map';
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Catalog from "../../pages/Catalog/Catalog.jsx";
import CategoriesPage from "../../AdminPages/CategoriesPage.jsx";
import ProductsOfCategoriesPage from "../../AdminPages/ProductsOfCategoriesPage.jsx";
import Login from "../../pages/SignInUp/Login.jsx";
import Register from "../../pages/SignInUp/Register.jsx";
import Profile from "../../pages/Profile/Profile.jsx";
import Home from "../../pages/Home/Home.jsx";
import Address from "../../pages/Address/Address.jsx";
import Cart from "../../pages/Cart/Cart.jsx";

function Header({categories}) {
    const [profileLink, setProfileLink] = useState('/login');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setProfileLink('/profile');
        } else {
            setProfileLink('/login');
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
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>

                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Поиск..."
                                className="mr-2"
                                aria-label="Search"
                            />
                        </Form>
                        <Nav>
                            <Nav.Link href="/addresses">
                                <MapIcon/>
                            </Nav.Link>
                            <Nav.Link href="/cart">
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
