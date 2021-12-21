import { NavLink } from "react-router-dom";

import styles from './Header.module.scss';

import { useAuthContext } from '../../contexts/AuthContext.js';

import GuestNavButtons from "./GuestNavButtons/GuestNavButtons.js";
import LoggedUserNavButtons from "./LoggedUserNavButtons/LoggedUserNavButtons.js";

const Header = () => {
    const { user } = useAuthContext();
    
    return (
        <header className={styles.headerCustomStyles}>
            <nav className={`navbar navbar-expand-lg ${styles.navbarCustomStyles}`}>
                <div>
                    <NavLink to="/" activeClassName="selected">
                        Home
                    </NavLink>
                    <NavLink to="/home-services/all-listings">All Services</NavLink>

                    {user.firstName !== '' ? <LoggedUserNavButtons navItemCreateListing={true} /> : ''}
                </div>
                <div>{user.firstName !== '' ? <LoggedUserNavButtons email={user.email} /> : ''}</div>

                <div>{user.firstName !== '' ? <LoggedUserNavButtons navItemsProfileLogout={true} /> : <GuestNavButtons />}</div>
            </nav>
        </header>
    );
};

export default Header;
