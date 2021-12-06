import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

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

function App() {
    const [error, setError ] = useState('');
    
    const displayError = (newError) => {
        if(newError.hasOwnProperty('errors')){
            let newErrors = [];

            Object.keys(newError.errors).forEach(err => {
                newErrors.push({
                    message: `${newError.errors[err].message}`,
                });
            });

            setError(newErrors);
        } else {
            if (newError.message === 'Failed to fetch') {
                newError.code = 500;
                newError.message = 'Communication with server has failed';
            }

            setError([newError]);
        }
         
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    const errorMessageTemplate = error => {
        return (
            <>
                <h3> Oops!</h3>

                {error.map(error => {
                    return (
                        <p>
                            {error.code ? `${error.code} : ` : ''} {error.message}{' '}
                        </p>
                    );
                })}
            </>
        );
    };


    return (
        <ErrorContext.Provider value={{ displayError }}>
            <AuthProvider>
                <>
                    <Header />
                    {error 
                    ? errorMessageTemplate(error)
                    : ''
                    }

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
