import { useNavigate } from 'react-router-dom';

import * as homeServicesService from '../../../services/homeServicesService.js';
import SelectOptions from '../Create/SelectOptions/SelectOptions.js';
import typesOfServices from '../../../data/typesOfServices.json';
import { useContext } from 'react';
import { useAuthContext } from '../../../contexts/AuthContext.js';
import ErrorContext from '../../../contexts/ErrorContext.js';

const Create = () => {
    const { user } = useAuthContext();
    const { displayError } = useContext(ErrorContext);
    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();

        let { typeOfService, description, price, cityOfOperation, imageUrl, isVaccinated } = Object.fromEntries(new FormData(e.currentTarget));

        let service = {
            typeOfService,
            description,
            price,
            cityOfOperation,
            imageUrl,
            isVaccinated,
            creator: localStorage.getItem('userId')
        };

        //Server not working error
        try {
            await homeServicesService.create(service, user.AUTH_TOKEN);

            navigate('/home-services/all-listings');
        } catch (error) {
            
            displayError(await error);
        }

    }

    return (
        <form method="POST" action="" onSubmit={onFormSubmit}>
            <select name="typeOfService" id="serviceType">
                {typesOfServices.map(x => {
                    return (
                        <SelectOptions key={x._id} value={x.value}>
                            {x.name}
                        </SelectOptions>
                    );
                })}
            </select>

            <textarea name="description" placeholder="Elaborate further about your service..." cols="30" rows="5"></textarea>

            <input type="number" name="price" placeholder="Price" required />

            <input type="text" name="cityOfOperation" placeholder="City of Operation" required />

            <input type="text" name="imageUrl" placeholder="Insert Image URL" required />

            <p>Are you vaccinated?</p>
            <label htmlFor="YesIsVaccinated">Yes</label>
            <input type="radio" name="isVaccinated" id="YesIsVaccinated" defaultValue="Yes" required />

            <label htmlFor="NoIsVaccinated">No</label>
            <input type="radio" name="isVaccinated" id="NoIsVaccinated" defaultValue="No" required />
            <input type="submit" />
        </form>
    );
};

export default Create;
