import { useState } from 'react';

import styles from './Home.module.css';

import { useErrorContext } from '../../contexts/ErrorContext.js';

import typesOfServices from "../../data/typesOfServices.json";
import SelectOptions from '../HomeServices/Create/SelectOptions/SelectOptions.js';
import * as homeServicesService from '../../services/homeServicesService.js';
import ListingCard from "../HomeServices/AllListings/ListingCard/ListingCard.js";

const Home = () => {
    const { displayError } = useErrorContext();
    let [searchResults, setSearchResults ] = useState([])

    const onFormSubmitHanlder = async (e) => {
        e.preventDefault();

        const { typeOfService, cityOfOperation } = Object.fromEntries(new FormData(e.currentTarget));

        try {
            let result = await homeServicesService.search(typeOfService, cityOfOperation);
            setSearchResults(result);

        } catch(error) {
            displayError(await error);
        }
    }

    return (
        <section className={styles.homePageSection}>
            <h1>Welcome to HOMEZY</h1>

            <p>Services</p>
            <form method="GET" action="" onSubmit={onFormSubmitHanlder}>
                <label htmlFor="serviceType">What?</label>
                <select name="typeOfService" id="serviceType">
                    {typesOfServices.map(x => {
                        return (
                            <SelectOptions key={x._id} value={x.value}>
                                {x.name}
                            </SelectOptions>
                        );
                    })}
                </select>
                <label htmlFor="cityOfOperation">Where?</label>
                <input type="text" name="cityOfOperation" id="cityOfOperation" placeholder="Where?" />
                <input type="submit" />
            </form>

            { 
                searchResults.length > 0
                    ?   searchResults.map(x => (
                            <ListingCard key={x._id} service={x} />
                        ))
                    : ''
            }
        </section>
    );
};

export default Home;
