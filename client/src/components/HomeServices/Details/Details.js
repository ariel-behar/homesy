import { useParams, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import IsAuthRouteGuard from '../../../hoc/IsAuthRouteGuard.js';

import styles from './Details.module.scss'

import * as homeServicesService from '../../../services/homeServicesService.js';
import Edit from '../Edit/Edit.js';

import DetailsCard from './DetailsCard/DetailsCard.js';

const Details = () => {
    const { homeServiceId } = useParams();
    let [service, setService] = useState('');

    const renderEditedService = (editedService) => {
        setService(editedService);
    }

    useEffect(() => {
        homeServicesService.getOne(homeServiceId)
            .then(result => {
                setService(result);
            })
    }, [homeServiceId]);

    return (
        <section className={styles.detailsComponentSection}>
            {service 
                ? <DetailsCard service={service} homeServiceId={homeServiceId} />
                : <p>Loading...</p>
            }
            <Routes>
                <Route element={<IsAuthRouteGuard />}>
                    <Route path="/edit" element={<Edit service={service} homeServiceId={homeServiceId} renderEditedService={renderEditedService} />} />
                </Route>
            </Routes>
        </section>
    );
};

export default Details;
