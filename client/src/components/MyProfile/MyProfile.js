import { useEffect, useState } from "react";

import styles from './MyProfile.module.scss'

import { useAuthContext } from '../../contexts/AuthContext.js';
import { useErrorContext } from '../../contexts/ErrorContext.js';

import * as homeServicesService from '../../services/homeServicesService.js';
import * as favoritesService from '../../services/favoritesService.js';

import ListingCard from '../../components/HomeServices/AllListings/ListingCard/ListingCard.js';

function MyProfile() {
    const { user } = useAuthContext();
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
        <section className={styles.myProfileComponentSection}>
            <div>
                <h3>My Profile</h3>
                <img src="/img/divider.png" alt="Divider" />
            </div>

            <div className={styles.userProfile}>
                <img src={`/img/${user.gender}-avatar.png`} alt={`${user.gender} Avatar`} className="img-fluid" />
                <h3>Name: {`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}</h3>
                <h5>E-mail: {user.email}</h5>
            </div>

            <div className={styles.allListings}>
                <div>
                    <h4>My Listings</h4>
                    <img src="/img/divider.png" alt="Divider" />

                    <div>
                        {myListings.length > 0 
                            ? myListings.map(x => <ListingCard key={x._id} service={x} />) 
                            : 'You have not listed any services of your own yet...'
                        }
                    </div>
                </div>

                <div>
                    <h4>My Favorite Listings</h4>
                    <img src="/img/divider.png" alt="Divider" />

                    <div>
                        {myFavorites.length > 0 
                            ? myFavorites.map(x => <ListingCard key={x._id} service={x} />) 
                            : 'No services have been added to your favorites list yet...'
                        }
                    </div>
                </div>
            </div>
        </section>
    );
    
}

export default MyProfile
