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
    });
    

    return (
        <section className={styles.allListingsSection}>
            <div>
                <h3>All Services</h3>
                <img src="/img/divider.png" alt="Divider" />
            </div>

            <div className={styles['cardsDiv']}>
                { services.length > 0 
                    ? services.map(x => (
                        <ListingCard key={x._id} service={x} />
                        ))
                    : <p>Currently there are no listed services</p>
                }
            </div>
        </section>
    );
};

export default AllListings;
