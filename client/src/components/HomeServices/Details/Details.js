import { useParams, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as homeServicesService from '../../../services/homeServicesService.js';
import Edit from '../Edit/Edit.js';
import { useAuthContext } from '../../../contexts/AuthContext.js';
import CreatorUserButtons from './CreatorUserButtons/CreatorUserButtons.js';
import IsAuthRouteGuard from '../../../hoc/IsAuthRouteGuard.js';
import AuthenticatedNonCreatorButtons from './AuthenticatedNonCreatorButtons/AuthenticatedNonCreatorButtons.js';

const Details = () => {
    const { user, isAuthenticated, isAuthorized } = useAuthContext();

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
        <>
            {service ? (
                <div className="card text-center">
                    <div className="card-header">Home Service</div>
                    <div className="card-body">
                        <img src={service.imageUrl} className="img-fluid" alt={`${service.typeOfService}`} />
                        <h5 className="card-title">{service.typeOfService}</h5>
                        <p className="card-text">{service.description}</p>
                        <p className="card-text">{service.price} BGN</p>

                        {isAuthorized(service.creator) ? (
                            <CreatorUserButtons service={service} homeServiceId={homeServiceId} />
                        ) : isAuthenticated ? (
                            <AuthenticatedNonCreatorButtons user={user} homeServiceId={homeServiceId} />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="card-footer text-muted">[INSERT SOMETHING HERE]</div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Routes>
                <Route element={<IsAuthRouteGuard />}>
                    <Route path="/edit" element={<Edit service={service} homeServiceId={homeServiceId} renderEditedService={renderEditedService} />} />
                </Route>
            </Routes>
        </>
    );
};

export default Details;
