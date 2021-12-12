import { useContext, useEffect, useState } from "react";

import * as homeServicesService from '../../services/homeServicesService.js';
import * as favoritesService from '../../services/favoritesService.js';
import { useAuthContext} from '../../contexts/AuthContext.js'
import ErrorContext from "../../contexts/ErrorContext.js";
import ListingCard from '../../components/HomeServices/AllListings/ListingCard/ListingCard.js';

function MyProfile() {
    const { user } = useAuthContext();
    const { displayError } = useContext(ErrorContext)

    const [ myListings, setMyListings ] = useState([]);
    const [ myFavorites, setMyFavorites ] = useState([]);

    useEffect(() => {
        Promise.all([homeServicesService.getAllbyUser(user.AUTH_TOKEN), favoritesService.getUserFavorites(user.AUTH_TOKEN)])
            .then(res => {
                setMyListings(res[0]);
                setMyFavorites(res[1]);
            })
            .catch(err => {
                displayError(err);
            });
    }, [])
    
    return (
        <div>
            <h3>My Listings</h3>

            <div className="row">
                {myListings.map(x => (
                    <ListingCard key={x._id} service={x} />
                ))}
            </div>

            <h3>My Favorite Listings</h3>
            <div className="row">
                {myFavorites.map(x => (
                    <ListingCard key={x._id} service={x} />
                ))}
            </div>
        </div>
    );
}

export default MyProfile
