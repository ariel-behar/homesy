import { useParams, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import IsAuthRouteGuard from '../../../hoc/IsAuthRouteGuard.js';

import styles from './Details.module.scss'

import * as homeServicesService from '../../../services/homeServicesService.js';
import Edit from '../Edit/Edit.js';

import DetailsCard from './DetailsCard/DetailsCard.js';
import { OnwerButtonsProvider, useOwnerButtonsContext } from '../../../contexts/OwnerButtonsContext.js';

const Details = () => {
    const { homeServiceId } = useParams();
    let [service, setService] = useState('');
    let { toggleOwnerButtons } = useOwnerButtonsContext();
    

    const renderEditedService = (editedService) => {
        toggleOwnerButtons();
        setService(editedService);
    }

    const refreshOnwerButtonsToggler = () => {
        toggleOwnerButtons();
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
                ? <DetailsCard 
                    service={service} 
                    homeServiceId={homeServiceId} /> 
                : <p>Loading...</p>
            }
            
            <Routes>
                <Route element={<IsAuthRouteGuard />}>
                    <Route 
                    path="/edit" 
                    element={
                    <OnwerButtonsProvider>
                        <Edit 
                            service={service} 
                            homeServiceId={homeServiceId} 
                            renderEditedService={renderEditedService} 
                            refreshOnwerButtonsToggler={refreshOnwerButtonsToggler}
                        />
                    </OnwerButtonsProvider>} 
                    />
                </Route>
            </Routes>
        </section>
    );
};

export default Details;
