import { useNavigate } from 'react-router-dom';

import * as homeServicesService from '../../../services/homeServicesService.js';


//NEED TO EDIT

const Create = () => {
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

        await homeServicesService.create(service);
        
        navigate('/home-services/all-listings');
    }

    return (
        <form method="POST" action="" onSubmit={onFormSubmit}>
            <select name="typeOfService" id="serviceType">
                <option value="hairdresser">Hairdresser</option>
                <option value="teaching">Teaching</option>
                <option value="cleaning">Cleaning</option>
                <option value="homeRepairs">Home Repairs</option>
            </select>

            <textarea name="description" placeholder="Elaborate further about your service..." cols="30" rows="5"></textarea>

            <input type="number" name="price" placeholder="Price" />

            <input type="text" name="cityOfOperation" placeholder="City of Operation" />

            <input type="text" name="imageUrl" placeholder="Insert Image URL" />

            <p>Are you vaccinated?</p>
            <label htmlFor="YesIsVaccinated">Yes</label>
            <input type="radio" name="isVaccinated" id="YesIsVaccinated" defaultValue="Yes" />

            <label htmlFor="NoIsVaccinated">No</label>
            <input type="radio" name="isVaccinated" id="NoIsVaccinated" defaultValue="No" />
            <input type="submit" />
        </form>
    );
};

export default Create;
