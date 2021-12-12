import { useState, useEffect, useContext } from 'react';
import ErrorContext from '../../../contexts/ErrorContext.js';
import * as homeServicesService from '../../../services/homeServicesService.js'

// import styles from './AllListings.module.css'
import ListingCard from './ListingCard/ListingCard.js';

const Listings = () => {
    const {displayError } = useContext(ErrorContext)
    let [ services, setServices ] = useState([]);

    useEffect(() => {
        homeServicesService.getAll()
            .then(res => setServices(res))
            .catch(err => displayError(err) )

    }, []);

    return (
        <div className="row">
            {services.map(x => (
                <ListingCard key={x._id} service={x} />
            ))}
        </div>
    );
};

export default Listings;
