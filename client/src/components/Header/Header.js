import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

import styles from "./Header.module.css";
import GuestNavButtons from "./GuestNavButtons/GuestNavButtons.js";
import LoggedUserNavButtons from "./LoggedUserNavButtons/LoggedUserNavButtons.js";

const Header = () => {
    let [user, setUser ] = useState({});

    useEffect(() => {
        let username = localStorage.getItem('username');
        let userId = localStorage.getItem('userId');

        if(username && userId) {
            let user = {
                userId,
                username,
            }

            setUser(user);
        }
    }, [])

    console.log(user)


    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink to="/" activeClassName="active"> Home </NavLink>
                    <NavLink to="/all-listings" activeClassName="active"> All Listings </NavLink>
                    <NavLink to="/details/:listingId" activeClassName="active"> Details </NavLink>
                    { user ? <LoggedUserNavButtons username={user.username}/> : <GuestNavButtons /> }


                </div>
            </nav>
        </header>
        // <div className="container">
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //         <div className="container-fluid">
        //             <a className="navbar-brand" href="#">
        //                 Navbar
        //             </a>
        //             <button
        //                 className="navbar-toggler"
        //                 type="button"
        //                 data-bs-toggle="collapse"
        //                 data-bs-target="#navbarSupportedContent"
        //                 aria-controls="navbarSupportedContent"
        //                 aria-expanded="false"
        //                 aria-label="Toggle navigation"
        //             >
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 <ul className="navbar-nav">
        //                     <li className="nav-item">
        //                         <a className="nav-link active" aria-current="page" href="/">
        //                             Home
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">
        //                             Listings
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="#">
        //                             Link
        //                         </a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    );
};

export default Header;
