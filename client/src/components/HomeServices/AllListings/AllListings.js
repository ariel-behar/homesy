import { useState, useEffect } from 'react';
import * as homeServicesService from '../../../services/homeServicesService.js'

// import styles from './AllListings.module.css'
import ListingCard from './ListingCard/ListingCard.js';

const Listings = () => {
    let [ services, setServices ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let homeServices = await homeServicesService.getAll();
            return setServices(homeServices);
        }

        fetchData()
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
