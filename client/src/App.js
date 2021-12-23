import { Routes, Route } from 'react-router-dom';

import "./App.scss";

import { AuthProvider } from './contexts/AuthContext.js';
import {ErrorProvider} from './contexts/ErrorContext.js';

import Error from "./components/Common/Error/Error.js";
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
import IsAuthRouteGuard from './hoc/IsAuthRouteGuard.js';
import IsGuestRouteGuard from './hoc/IsGuestRouteGuard.js';
import MyProfile from './components/MyProfile/MyProfile.js';
import { OnwerButtonsProvider } from './contexts/OwnerButtonsContext.js';

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <>
                    <div style={{ backgroundImage: `url(../img/main-background.png)` }}>
                        <Header />

                        <main style={{ backgroundImage: `url(../img/app-background-mosaic.svg)` }}>
                            <Error />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home-services/all-listings" element={<AllListings />} />

                                <Route element={<IsAuthRouteGuard />}>
                                    <Route path="/home-services/create" element={<Create />} />
                                    <Route path="/logout" element={<Logout />} />
                                    <Route path="/my-profile" element={<MyProfile />} />
                                </Route>

                                <Route
                                    path="/home-services/:homeServiceId/*"
                                    element={
                                        <OnwerButtonsProvider>
                                            <Details />
                                        </OnwerButtonsProvider>
                                    }
                                />

                                <Route element={<IsGuestRouteGuard />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </Route>

                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
