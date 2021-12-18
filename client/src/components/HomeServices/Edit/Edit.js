import { Link,useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './Edit.module.scss';

import { useAuthContext } from '../../../contexts/AuthContext.js';
import { useErrorContext } from '../../../contexts/ErrorContext.js';

import SelectOptions from '../Create/SelectOptions/SelectOptions.js';
import typesOfServices from '../../../data/typesOfServices.json';
import * as homeServicesService from '../../../services/homeServicesService.js';

const Edit = ({
    homeServiceId,
    renderEditedService
}) => {
    const { user, isAuthorized } = useAuthContext()
    const { displayError } = useErrorContext();
    const navigate = useNavigate();

    let [service, setService] = useState({});

    useEffect(() => {
        homeServicesService.getOne(homeServiceId)
            .then(serviceResult => {
                if (!isAuthorized(serviceResult.creator)) {
                    displayError({ code: 400, message: 'Unauthorized access' });
                    navigate(`/home-services/all-listings`);
                } else {
                    setService(serviceResult);
                }
            })
    }, [])
  
    const onFormSubmit = async (e) => {
        e.preventDefault();

        let { typeOfService, description, price, cityOfOperation, imageUrl } = Object.fromEntries(new FormData(e.currentTarget));

         let homeServiceObj = {
            typeOfService,
            description,
            price,
            cityOfOperation,
            imageUrl,
        };

        try {
            let editedServiceResponse = await homeServicesService.updateOne(homeServiceId, homeServiceObj, user.AUTH_TOKEN);

            renderEditedService(editedServiceResponse);

            navigate(`/home-services/${homeServiceId}`);
        } catch (error) {
            displayError(await error);
        }
    }

    return (
        <section className={styles.editComponentSection}>
            {service ? (
                <Form method="POST" action="" onSubmit={onFormSubmit}>
                    <Form.Group controlId="typeOfService">
                        <Form.Label>Type of Service</Form.Label>
                        <Form.Select name="typeOfService" defaultValue={service.typeOfService}>
                            {typesOfServices.map(x => {
                                return (
                                    <SelectOptions key={x._id} value={x.value}>
                                        {x.name}
                                    </SelectOptions>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} cols={30} name="description" placeholder="Elaborate further about your service..." defaultValue={service.description} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price </Form.Label>
                        <Form.Control type="number" name="price" placeholder="Service price in BGN" defaultValue={service.price} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cityOfOperation">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="cityOfOperation" placeholder="The city in which you operate" defaultValue={service.cityOfOperation} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" name="imageUrl" placeholder="Image URL" defaultValue={service.imageUrl} required />
                    </Form.Group>

                    <div className={styles.buttons}>
                        <Link to={`/home-services/${homeServiceId}`}>
                            <Button variant="danger" type="submit">
                                Cancel &nbsp;
                                <FontAwesomeIcon icon="times" size="md" />
                            </Button>
                        </Link>
                        <Button variant="primary" type="submit">
                            Submit Changes &nbsp;
                            <FontAwesomeIcon icon="check" size="md" />
                        </Button>
                    </div>
                </Form>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default Edit;
