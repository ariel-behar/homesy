import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as homeServicesService from '../../../services/homeServicesService.js';

const Details = () => {
    const navigate = useNavigate();

    const { homeServiceId } = useParams();
    let [service, setService] = useState({});

    useEffect(() => {
        homeServicesService.getOne(homeServiceId)
            .then(result => {
                setService(result);
            })
    }, [homeServiceId]);

    const onDeleteButtonClick = async e => {
        e.preventDefault();

        let userResponse = window.confirm('Are you sure you want to delete this service?');

        if (userResponse) {
            console.log('Yes');

            await homeServicesService.deleteOne(homeServiceId);

            navigate('/home-services/all-listings');
        } 
    };

    return (
        <>
            {service.length > 0 ? (
                <div className="card text-center">
                    <div className="card-header">Home Service</div>
                    <div className="card-body">
                        <img src={service[0].imageUrl} className="img-fluid" alt={`${service[0].typeOfService}`} />
                        <h5 className="card-title">{service[0].typeOfService}</h5>
                        <p className="card-text">{service[0].description}</p>
                        <p className="card-text">{service[0].price} BGN</p>
                        <Link to={`/home-services/${service[0]._id}/edit`} className="btn btn-primary">
                            Edit
                        </Link>
                        <button className="btn btn-danger" onClick={onDeleteButtonClick}>
                            Delete
                        </button>
                    </div>
                    <div className="card-footer text-muted">[INSERT SOMETHING HERE]</div>
                </div>
            ) : (
                <p>blas</p>
            )}
        </>
    );
};

export default Details;
