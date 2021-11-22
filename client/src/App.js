import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer.js';

import Header from './components/Header/Header.js';
import Home from "./components/Home/Home.js";
import AllListings from './components/AllListings/AllListings.js';
import Details from './components/Details/Details.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

import "./App.css";

function App() {
    return (
        <>
            <Header />

            <main id="main" className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-listings" element={<AllListings />} />
                    <Route path="/details/:listingId" element={<Details />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
