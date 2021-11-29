import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';

import Home from "./components/Home/Home.js";
import AllListings from './components/AllListings/AllListings.js';
import Details from './components/Details/Details.js';
import Create from './components/Create/Create.js';

import Login from './components/Users/Login/Login.js';
import Register from './components/Users/Register/Register.js';
import Logout from './components//Users/Logout/Logout.js';

import "./App.css";


function App() {
    const [userInfo, setUserInfo] = useState({ isAuthenticated: false, user: '' });

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        let firstName = localStorage.getItem('firstName');
        let email = localStorage.getItem('email');

        let user = {
            userId,
            firstName,
            email
        };

        if (user.userId && user.firstName && user.email) {
            setUserInfo({
                isAuthenticated: true,
                user,
            });
        }

    }, [])

    const onRegister = email => {
        setUserInfo({
            isAuthenticated: true,
            user: email,
        });
    };


    const onLogin = (email) => {
        setUserInfo({
            isAuthenticated: true,
            user: email,
        });
    }

    const onLogOut = () => {
        setUserInfo({
            isAuthenticated: false,
            user: '',
        });
    }

    return (
        <>
            <Header {...userInfo} />

            <main id="main" className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services/all-listings" element={<AllListings />} />
                    <Route path="/services/:listingId/details" element={<Details />} />
                    <Route path="/services/create" element={<Create />} />
                    <Route path="/login" element={<Login onLogin={onLogin} />} />
                    <Route path="/register" element={<Register onRegister={onRegister}/>} />
                    <Route path="/logout" element={<Logout onLogOut={onLogOut} />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
