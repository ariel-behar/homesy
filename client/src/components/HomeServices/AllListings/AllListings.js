import { useState, useEffect } from 'react';
import { useErrorContext } from '../../../contexts/ErrorContext.js';
import * as homeServicesService from '../../../services/homeServicesService.js';

import styles from './AllListings.module.css'
import ListingCard from './ListingCard/ListingCard.js';

const Listings = () => {
    const { displayError } = useErrorContext();
    let [services, setServices] = useState([]);

    useEffect(() => {
        homeServicesService
            .getAll()
            .then(res => setServices(res))
            .catch(err => displayError(err));
    }, []);

    return (
        <section className={styles.allListingsSection}>
            <h4>All Listings</h4>

            <div className={styles['cardsDiv']}>
                {services.map(x => (
                    <ListingCard key={x._id} service={x} />
                ))}
            </div>
        </section>
    );
};

export default Listings;
