import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer.js';

import Header from './components/Header/Header.js';
import Home from "./components/Home/Home.js";

import "./App.css";
import Listings from './components/Listings/Listings.js';

function App() {
    return (
        <>
            <Header />

            <main id="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/listings" element={<Listings />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
