import { useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './Create.module.scss'

import { useAuthContext } from '../../../contexts/AuthContext.js';
import { useErrorContext } from '../../../contexts/ErrorContext.js';

import * as homeServicesService from '../../../services/homeServicesService.js';
import SelectOptions from '../Create/SelectOptions/SelectOptions.js';
import typesOfServices from '../../../data/typesOfServices.json';

const Create = () => {
    const { user } = useAuthContext();
    const { displayError } = useErrorContext();
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();

        let { typeOfService, description, price, cityOfOperation, imageUrl } = Object.fromEntries(new FormData(e.currentTarget));

        let service = {
            typeOfService,
            description,
            price,
            cityOfOperation,
            imageUrl,
            creator: user.userId
        };

        try {
            await homeServicesService.create(service, user.AUTH_TOKEN);

            navigate('/home-services/all-listings');
        } catch (error) {
            displayError(await error);
        }
    }

    return (
        <section className={styles.createComponentSection}>
            <Form method="POST" action="" onSubmit={onFormSubmit}>
                <Form.Group controlId="typeOfService">
                    <Form.Label>Type of Service</Form.Label>
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

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} cols={30} name="description" placeholder="Elaborate further about your service..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price </Form.Label>
                    <Form.Control type="number" name="price" placeholder="Service price in BGN" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cityOfOperation">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="cityOfOperation" placeholder="The city in which you operate" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="imageUrl" placeholder="Image URL" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </section>
    );
};

export default Create;
