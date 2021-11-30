import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as homeServicesService from '../../../services/homeServicesService.js';
import SelectOptions from '../Create/SelectOptions/SelectOptions.js';
import typesOfServices from '../../../data/typesOfServices.json';

const Edit = () => {
    const navigate = useNavigate();

    const { homeServiceId } = useParams();
    let [service, setService] = useState({});
    
    useEffect(() => {
        homeServicesService.getOne(homeServiceId)
            .then(result => {
                setService(result);
            });
    }, [homeServiceId]);

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

        await homeServicesService.updateOne(homeServiceId, service);
        
        navigate('/home-services/all-listings');
    }

    return (
        <>
            {service.length > 0 ? (
                <form method="POST" action="" onSubmit={onFormSubmit}>
                    <select name="typeOfService" id="serviceType" defaultValue={service[0].typeOfService}>
                        {typesOfServices.map(x => {
                           return <SelectOptions 
                                    key={x._id} 
                                    value={x.value} >
                                        {x.name}
                                </SelectOptions>
                        })}
                    </select>

                    <textarea name="description" placeholder="Elaborate further about your service..." cols="30" rows="5" defaultValue={service[0].description}></textarea>

                    <input type="number" name="price" placeholder="Price" defaultValue={service[0].price} />

                    <input type="text" name="cityOfOperation" placeholder="City of Operation" defaultValue={service[0].cityOfOperation} />

                    <input type="text" name="imageUrl" placeholder="Insert Image URL" defaultValue={service[0].imageUrl} />

                    <p>Are you vaccinated?</p>
                    <label htmlFor="YesIsVaccinated">Yes</label>
                    <input type="radio" name="isVaccinated" id="YesIsVaccinated" defaultValue="Yes" />

                    <label htmlFor="NoIsVaccinated">No</label>
                    <input type="radio" name="isVaccinated" id="NoIsVaccinated" defaultValue="No" />
                    <input type="submit" />
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Edit;
