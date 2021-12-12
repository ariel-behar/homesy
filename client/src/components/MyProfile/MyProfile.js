import { useContext, useEffect, useState } from "react";

import * as homeServicesService from '../../services/homeServicesService.js';
import * as favoritesService from '../../services/favoritesService.js';
import { useAuthContext} from '../../contexts/AuthContext.js'
import ErrorContext from "../../contexts/ErrorContext.js";

function MyProfile() {
    const { user } = useAuthContext();
    const { displayError } = useContext(ErrorContext)

    const [ myListings, setMyListings ] = useState([]);
    const [ myFavorites, setMyFavorites ] = useState([]);

    useEffect(() => {
        Promise.all([homeServicesService.getAllbyUser(user), favoritesService.getUserFavorites(user)])
            .then(res => {
                setMyListings(res[0])
                setMyFavorites(res[1]);
            })
            .catch(err => {
                displayError(err);
            });
    }, [])

    const getFavorites = (e) => {
        e.preventDefault();

        favoritesService.getUserFavorites(user)
    }

    return (
        <div>
            <h3>My Listings</h3>
            
            <h3>My Favorite Listings</h3>

            <button onClick={getFavorites}>Get User Favorites</button>
        </div>
    );
}

export default MyProfile
