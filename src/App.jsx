import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import CategoriesPage from "./AdminPages/CategoriesPage.jsx";
import Login from "./pages/SignInUp/Login.jsx";
import Register from "./pages/SignInUp/Register.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import Address from "./pages/Address/Address.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import {useEffect, useState} from "react";
import PolicyPage from "./pages/PolicyPage.jsx";


function App() {
    if (!localStorage.hasOwnProperty('cart')) {
        localStorage.setItem('cart', []);
    }

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('https://localhost:8081/api/v1/categories/all_categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Ошибка при загрузке категорий');
                }
            } catch (error) {
                console.error('Ошибка при подключении к серверу:', error);
            }
        }

        fetchCategories();
    }, []);




    return (
        <div className="d-flex flex-column min-vh-100">
            <Header categories={categories}/>
            <main className="flex-grow-1">
                <BrowserRouter>
                    <Routes>
                        <Route path="/admin/all_categories" element={<CategoriesPage  />} />
                        <Route path="/policy" element={<PolicyPage  />} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />

                        <Route path="/*" element={<Home />} />
                        <Route path="/addresses" element={<Address />} />
                        <Route path="/cart" element={<Cart />} />

                        {categories.map(category =>(
                            <Route path={`/catalog_${category.id}/*`} key={category.id} element={<Catalog category={category.title} categoryId={category.id}/>}/>
                        ))}
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
