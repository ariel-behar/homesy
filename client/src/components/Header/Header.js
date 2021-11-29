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

    );
};

export default Header;
