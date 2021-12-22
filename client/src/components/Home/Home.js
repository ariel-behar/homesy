import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Home.module.scss';

import { useErrorContext } from '../../contexts/ErrorContext.js';

import * as homeServicesService from '../../services/homeServicesService.js';

import typesOfServices from '../../data/typesOfServices.json';
import SelectOptions from '../HomeServices/Create/SelectOptions/SelectOptions.js';

import ListingCard from '../HomeServices/AllListings/ListingCard/ListingCard.js';

const Home = () => {
    const { displayError } = useErrorContext();
    let [searchResults, setSearchResults] = useState([]);
    let [profession, setProfession] = useState('');

    const onFormSubmitHanlder = async e => {
        e.preventDefault();

        const { typeOfService, cityOfOperation } = Object.fromEntries(new FormData(e.currentTarget));

        try {
            let result = await homeServicesService.search(typeOfService, cityOfOperation);
            setSearchResults(result);
        } catch (error) {
            displayError(await error);
        }
    };

    useEffect(() => {
        changeProfessionImage();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            changeProfessionImage();
        }, 5000);
    }, [profession]);

    const changeProfessionImage = () => {
        let servicesWithImages = typesOfServices.filter(x => x.image != '' && x.image != profession);
        let randomServiceIndex = Math.floor(Math.random() * (servicesWithImages.length - 1));

        setProfession(servicesWithImages[randomServiceIndex]);
    };

    return (
        <section className={styles.homeComponentSection}>
            <div>
                <h1>
                    Welcome to <span>HOMEZY</span>
                </h1>
                <img src="/img/divider.png" alt="Divider" />
                <p>THE one stop shop for home services in your area</p>
            </div>

            <div className={styles['form-div']}>
                <h3>Tell us what you are looking for... </h3>
                <Form method="GET" action="" onSubmit={onFormSubmitHanlder}>
                    <Form.Group controlId="typeOfService">
                        <Form.Label>What professional service?</Form.Label>
                        <Form.Select name="typeOfService">
                            {typesOfServices.map(x => {
                                return (
                                    <SelectOptions key={x._id} value={x.value}>
                                        {x.name}
                                    </SelectOptions>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="cityOfOperation">
                        <Form.Label>In which city?</Form.Label>
                        <Form.Control type="text" name="cityOfOperation" placeholder="Enter city..." />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Find! &nbsp;
                        <FontAwesomeIcon icon="search" size="md" />
                    </Button>
                </Form>
            </div>

            <div className={styles['profession-div']}>
                <div className={styles['profession-image-div']}>
                    <img src={`/img/professions/${profession.image}`} className="img-fluid" />
                    <h4>{profession.name}</h4>
                </div>
            </div>

            <div className={styles['cardsDivRow']}>
                {searchResults.length > 0 ? (
                    <>
                        <h5>Results: </h5>
                        <div className={styles['cardsDiv']}>
                            {searchResults.map(x => (
                                <ListingCard key={x._id} service={x} />
                            ))}
                        </div>
                    </>
                ) : (
                    <h5>Your results will appear here...</h5>
                )}
            </div>
        </section>
    );
};

export default Home;
