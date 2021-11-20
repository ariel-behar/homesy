import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Home from "./components/Home/Home.js";

function App() {
    return (
        <>
            <Header />
			
            <main id="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
