import { useState, useEffect } from 'react';
import { useErrorContext } from '../../../contexts/ErrorContext.js';
import * as homeServicesService from '../../../services/homeServicesService.js';

import styles from './AllListings.module.scss';
import ListingCard from './ListingCard/ListingCard.js';

const AllListings = () => {
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
            <h3>All Services</h3>

            <div className={styles['cardsDiv']}>
                {services.map(x => <ListingCard key={x._id} service={x} />)}
            </div>
        </section>
    );
};

export default AllListings;
