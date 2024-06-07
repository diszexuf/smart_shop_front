import {Navbar, Nav, Form, FormControl, Container} from 'react-bootstrap';
import {ShoppingCart, Person} from '@mui/icons-material';
import MapIcon from '@mui/icons-material/Map';

import {useEffect, useState} from "react";

function Header() {

    const [profileLink, setProfileLink] = useState('/sign_in');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setProfileLink('/profile');
        } else {
            setProfileLink('/sign_in');
        }
    }, []);

    return (
        <>
            {/*<BrowserRouter>*/}
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/">SmartShop</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Link href="/catalog_smartphones">Смартфоны</Nav.Link>
                                <Nav.Link href="/catalog_headphones">Наушники</Nav.Link>
                                <Nav.Link href="/catalog_smartwatches">Умные часы</Nav.Link>
                                <Nav.Link href="/catalog_accessories">Аксессуары</Nav.Link>

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

                {/*<Routes>*/}
                {/*    <Route path="/" element={<Home/>}/>*/}
                {/*    <Route path="/sign_in" element={<SignInUp/>}/>*/}
                {/*    <Route path="/addresses" element={<Address/>}/>*/}
                {/*    <Route path="/cart" element={<Cart/>}/>*/}

                {/*    <Route path="/catalog_smartphones" element={<Catalog category="Смартфоны" categoryId="1"/>}/>*/}
                {/*    <Route path="/catalog_headphones" element={<Catalog category="Наушники" categoryId="2"/>}/>*/}
                {/*    <Route path="/catalog_smartwatches" element={<Catalog category="Умные часы" categoryId="3"/>}/>*/}
                {/*    <Route path="/catalog_accessories" element={<Catalog category="Аксессуары" categoryId="4"/>}/>*/}


                {/*</Routes>*/}
            {/*</BrowserRouter>*/}
        </>
    );
}

export default Header;
