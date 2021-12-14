import { Routes, Route } from 'react-router-dom';

import "./App.css";

import { AuthProvider } from './contexts/AuthContext.js';
import {ErrorProvider} from './contexts/ErrorContext.js';

import Error from "./components/Error/Error.js";
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Home from "./components/Home/Home.js";
import AllListings from './components/HomeServices/AllListings/AllListings.js';
import Create from './components/HomeServices/Create/Create.js';
import Details from './components/HomeServices/Details/Details.js';
import Login from './components/Users/Login/Login.js';
import Register from './components/Users/Register/Register.js';
import Logout from './components//Users/Logout/Logout.js';


import PageNotFound from './components/PageNotFound/PageNotFound.js';
import RouteGuard from './hoc/RouteGuard.js';
import MyProfile from './components/MyProfile/MyProfile.js';

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <>
                    <Header />
                    <Error />

                    <main id="main" className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home-services/all-listings" element={<AllListings />} />
                            <Route element={<RouteGuard />}>
                                <Route path="/home-services/create" element={<Create />} />
                            </Route>
                            <Route path="/home-services/:homeServiceId/*" element={<Details />} />
                            <Route path="/my-profile" element={<MyProfile />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </main>

                    <Footer />
                </>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
