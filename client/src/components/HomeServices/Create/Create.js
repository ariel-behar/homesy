import { useNavigate } from 'react-router-dom';

import * as homeServicesService from '../../../services/homeServicesService.js';
import SelectOptions from '../Create/SelectOptions/SelectOptions.js';
import typesOfServices from '../../../data/typesOfServices.json';
import { useContext } from 'react';
import AuthContext from '../../../contexts/authContext.js';
import ErrorContext from '../../../contexts/errorContext.js';

const Create = () => {
    const { user } = useContext(AuthContext);
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
            let response = await homeServicesService.create(service, user.AUTH_TOKEN);
            console.log('response:', response)

            navigate('/home-services/all-listings');
        } catch (error) {
            let newError = await error;
            displayError(newError);
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
