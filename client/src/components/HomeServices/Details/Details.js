import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import * as homeServicesService from '../../../services/homeServicesService.js';
import Edit from '../Edit/Edit.js';
import AuthContext from '../../../contexts/authContext.js';

const Details = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const { homeServiceId } = useParams();
    let [service, setService] = useState('');

    const renderEditedService = (editedService) => {
        setService(editedService);
    }

    useEffect(() => {
        homeServicesService.getOne(homeServiceId)
            .then(result => {
                setService(result[0]);
            })
    }, [homeServiceId]);

    const onDeleteButtonClick = async e => {
        e.preventDefault();

        let userResponse = window.confirm('Are you sure you want to delete this service?');

        if (userResponse) {
            await homeServicesService.deleteOne(homeServiceId);

            navigate('/home-services/all-listings');
        } 
    };

    const creatorUserButtons = (
        <>
            <Link to={`/home-services/${service._id}/edit`} className="btn btn-primary">
                                Edit
            </Link>
            <button className="btn btn-danger" onClick={onDeleteButtonClick}>
                Delete
            </button>
        </>
    )
    


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

                        { service.creator === user.userId 
                            ?  creatorUserButtons
                            : <p>{service.creator, user.userId}</p>
                        }
                       
                    </div>
                    <div className="card-footer text-muted">[INSERT SOMETHING HERE]</div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Routes>
                <Route path="/edit" element={<Edit service={service} homeServiceId={homeServiceId} renderEditedService={renderEditedService} />} />
            </Routes>
        </>
    );
};

export default Details;
