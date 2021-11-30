import { NavLink } from "react-router-dom";
import { useContext } from 'react';

// import styles from "./Header.module.css";
import GuestNavButtons from "./GuestNavButtons/GuestNavButtons.js";
import LoggedUserNavButtons from "./LoggedUserNavButtons/LoggedUserNavButtons.js";
import AuthContext from "../../contexts/authContext.js";

const Header = () => {
    const {isAuthenticated, user} = useContext(AuthContext)
    
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink to="/" > Home </NavLink>
                    <NavLink to="/home-services/all-listings" > All Listings </NavLink>
                    {/* <NavLink to="/services/:listingId/details/" > Details </NavLink> */}
                    { isAuthenticated 
                        ? <LoggedUserNavButtons user={user}/> 
                        : <GuestNavButtons /> 
                    }
                </div>
            </nav>
        </header>

    );
};

export default Header;
