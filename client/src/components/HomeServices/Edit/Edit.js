import { Link, useNavigate } from 'react-router-dom';

import * as homeServicesService from '../../../services/homeServicesService.js';
import SelectOptions from '../Create/SelectOptions/SelectOptions.js';
import typesOfServices from '../../../data/typesOfServices.json';
import { useContext } from 'react';
import AuthContext from '../../../contexts/authContext.js';
import ErrorContext from '../../../contexts/errorContext.js';

const Edit = ({
    service,
    homeServiceId,
    renderEditedService
}) => {
    const { user } = useContext(AuthContext)
    const { displayError } = useContext(ErrorContext);
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        
        let typeOfService = formData.get('typeOfService');
        let description = formData.get('description');
        let price = formData.get('price');
        let cityOfOperation = formData.get('cityOfOperation');
        let imageUrl = formData.get('imageUrl');

        let isVaccinated = formData.get('isVaccinated');

        let homeServiceObj = {
            typeOfService,
            description,
            price,
            cityOfOperation,
            imageUrl,
            isVaccinated,
        };

        try {
            let response = await homeServicesService.updateOne(homeServiceId, homeServiceObj, user.AUTH_TOKEN);
            console.log('response:', response)

            renderEditedService({ ...homeServiceObj, creator: service.creator, _id: homeServiceId });

            navigate(`/home-services/${homeServiceId}`);
        } catch (error) {
            console.log(error)
            let newError = await error;
            displayError(newError);
        }
    }

    return (
        <>
            {service ? (
                <form method="POST" action="" onSubmit={onFormSubmit}>
                    <select name="typeOfService" id="serviceType" defaultValue={service.typeOfService}>
                        {typesOfServices.map(x => {
                            return (
                                <SelectOptions key={x._id} value={x.value}>
                                    {x.name}
                                </SelectOptions>
                            );
                        })}
                    </select>

                    <textarea name="description" placeholder="Elaborate further about your service..." cols="30" rows="5" defaultValue={service.description}></textarea>

                    <input type="number" name="price" placeholder="Price" defaultValue={service.price} required />

                    <input type="text" name="cityOfOperation" placeholder="City of Operation" defaultValue={service.cityOfOperation} required />

                    <input type="text" name="imageUrl" placeholder="Insert Image URL" defaultValue={service.imageUrl} required />

                    <p>Are you vaccinated?</p>
                    <label htmlFor="YesIsVaccinated">Yes</label>
                    <input type="radio" name="isVaccinated" id="YesIsVaccinated" defaultValue="Yes" required />

                    <label htmlFor="NoIsVaccinated">No</label>
                    <input type="radio" name="isVaccinated" id="NoIsVaccinated" defaultValue="No" required />
                    <input type="submit" className="btn btn-primary" />
                    <Link to={`/home-services/${homeServiceId}`} className="btn btn-danger">Cancel</Link>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Edit;
