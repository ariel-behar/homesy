import { useEffect, useState } from "react";

import * as homeServicesService from '../../services/homeServicesService.js';
import * as favoritesService from '../../services/favoritesService.js';
import { useAuthContext} from '../../contexts/AuthContext.js'
import { useErrorContext } from "../../contexts/ErrorContext.js";
import ListingCard from '../../components/HomeServices/AllListings/ListingCard/ListingCard.js';

function MyProfile() {
    const { user } = useAuthContext();
    console.log('user:', user)
    const { displayError } = useErrorContext()

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
        <>
            <div className="me-auto">
                <h3>Name: {`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}</h3>
                <h5>E-mail: {user.email}</h5>
            </div>

            <div>
                <h3>My Listings</h3>

                <div className="row">{myListings.length > 0 ? myListings.map(x => <ListingCard key={x._id} service={x} />) : 'You have not listed any services yet'}</div>

                <h3>My Favorite Listings</h3>
                <div className="row">{myFavorites.length > 0 ? myFavorites.map(x => <ListingCard key={x._id} service={x} />) : 'You have not added any services to your favorites list yet'}</div>
            </div>
        </>
    );
    
}

export default MyProfile
