import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AuthContext from './contexts/authContext.js';

import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';

import Home from "./components/Home/Home.js";

import AllListings from './components/HomeServices/AllListings/AllListings.js';
import Create from './components/HomeServices/Create/Create.js';
import Details from './components/HomeServices/Details/Details.js';
import Edit from './components/HomeServices/Edit/Edit.js';

import Login from './components/Users/Login/Login.js';
import Register from './components/Users/Register/Register.js';
import Logout from './components//Users/Logout/Logout.js';

import "./App.css";
import PageNotFound from './components/PageNotFound/PageNotFound.js';

const initialUserState = {
    userId: '',
    firstName: '',
    email: '',
    AUTH_TOKEN: '',
};

function App() {
    const [user, setUser] = useState(initialUserState);

    useEffect(() => {
        let userId = localStorage.getItem('userId');
        let firstName = localStorage.getItem('firstName');
        let email = localStorage.getItem('email');
        let AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');

        let userObj = {
            userId,
            firstName,
            email,
            AUTH_TOKEN
        };

        if (userId && firstName && email && AUTH_TOKEN) {
            setUser(userObj);
        }
    }, [])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(initialUserState);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <>
                <Header />

                <main id="main" className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home-services/all-listings" element={<AllListings />} />
                        <Route path="/home-services/create" element={<Create />} />
                        <Route path="/home-services/:homeServiceId/*" element={<Details />} />
                        {/* <Route path="/home-services/:homeServiceId/edit" element={<Edit />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>

                <Footer />
            </>
        </AuthContext.Provider>
    );
}

export default App;
