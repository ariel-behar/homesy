import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        }, 10000);
    }, [profession]);

    const changeProfessionImage = () => {
        let servicesWithImages = typesOfServices.filter(x => x.image != '' && x.image != profession);
        let randomServiceIndex = Math.floor(Math.random() * (servicesWithImages.length - 1));

        setProfession(servicesWithImages[randomServiceIndex]);
    };

    return (
        <section className={styles.homeComponentSection}>
            <h1>Welcome to HOMEZY</h1>

            <div className={styles['profession-div']}>
                <h3>Tell us what you are looking for? </h3>
                <div className={styles['profession-image-div']}>
                    <img src={`/img/professions/${profession.image}`} className="img-fluid" />
                    <p>{profession.name}</p>
                </div>
            </div>

            <Form method="GET" action="" onSubmit={onFormSubmitHanlder}>
                <Form.Group controlId="typeOfService">
                    <Form.Label>What?</Form.Label>
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
                    <Form.Label>Where?</Form.Label>
                    <Form.Control type="text" name="cityOfOperation" placeholder="Where?" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Find!
                </Button>
            </Form>

            <div className={styles['cardsDiv']}>{searchResults.length > 0 ? searchResults.map(x => <ListingCard key={x._id} service={x} />) : <p>Your results will appear here</p>}</div>
        </section>
    );
};

export default Home;
