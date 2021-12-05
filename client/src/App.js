import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { AuthProvider } from './contexts/AuthContext.js';
import ErrorContext from './contexts/ErrorContext.js';

import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';

import Home from "./components/Home/Home.js";

import AllListings from './components/HomeServices/AllListings/AllListings.js';
import Create from './components/HomeServices/Create/Create.js';
import Details from './components/HomeServices/Details/Details.js';

import Login from './components/Users/Login/Login.js';
import Register from './components/Users/Register/Register.js';
import Logout from './components//Users/Logout/Logout.js';

import "./App.css";
import PageNotFound from './components/PageNotFound/PageNotFound.js';

// NEed to continue with the Edit page. in the authController you are sending the AUTH_token res.send. COnsider changing it + you need to implement proper error handling for the authController processes

function App() {
    const [error, setError ] = useState('');
    
    useEffect(() => {

    }, [error])

    const displayError = (newError) => {
        setError(newError);
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    return (
        <ErrorContext.Provider value={{ displayError }}>
            <AuthProvider>
                <>
                    <Header />
                    {error ? (
                        <h3>
                            Oops! {error.code} {error.code ? ':' : ''} {error.message}{' '}
                        </h3>
                    ) : (
                        ''
                    )}

                    <main id="main" className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home-services/all-listings" element={<AllListings />} />
                            <Route path="/home-services/create" element={<Create />} />
                            <Route path="/home-services/:homeServiceId/*" element={<Details />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </main>

                    <Footer />
                </>
            </AuthProvider>
        </ErrorContext.Provider>
    );
}

export default App;
