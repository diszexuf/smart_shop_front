import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile/Profile.jsx";
import Home from "./pages/Home/Home.jsx";
import SignInUp from "./pages/SignInUp/SignInUp.jsx";
import Address from "./pages/Address/Address.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";


function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <main className="flex-grow-1">
                <BrowserRouter>
                    <Routes>
                        <Route path="/sign_in" element={<SignInUp/>}/>
                        <Route path="/profile" element={<Profile/>} />

                        <Route path="/" element={<Home/>}/>
                        <Route path="/addresses" element={<Address/>}/>
                        <Route path="/cart" element={<Cart/>}/>

                        <Route path="/catalog_smartphones" element={<Catalog category="Смартфоны" categoryId="1"/>}/>
                        <Route path="/catalog_headphones" element={<Catalog category="Наушники" categoryId="2"/>}/>
                        <Route path="/catalog_smartwatches" element={<Catalog category="Умные часы" categoryId="3"/>}/>
                        <Route path="/catalog_accessories" element={<Catalog category="Аксессуары" categoryId="4"/>}/>
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer/>


        </div>
    );
}

export default App;
