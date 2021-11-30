import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as homeServicesService from '../../../services/homeServicesService.js';

const Details = () => {
    const { homeServiceId } = useParams();
    let [service, setService] = useState({});

    useEffect(() => {
        homeServicesService.getOne(homeServiceId)
            .then(result => {
                setService(result);
            })
    }, [homeServiceId]);

    return (
        <>
            {service.length > 0 ? (
                <div class="card text-center">
                    <div class="card-header">Home Service</div>
                    <div class="card-body">
                        <img src={service[0].imageUrl} className="img-fluid" alt={`${service[0].typeOfService} image`} />
                        <h5 class="card-title">{service[0].typeOfService}</h5>
                        <p class="card-text">{service[0].description}</p>
                        <p class="card-text">{service[0].price} BGN</p>
                        <Link to={`/home-services/${service[0]._id}/edit`} class="btn btn-primary">
                            Edit
                        </Link>
                        <Link to="#" class="btn btn-danger">
                            Delete
                        </Link>
                    </div>
                    <div class="card-footer text-muted">[INSERT SOMETHING HERE]</div>
                </div>
            ) : (
                <p>blas</p>
            )}
        </>
    );
};

export default Details;
