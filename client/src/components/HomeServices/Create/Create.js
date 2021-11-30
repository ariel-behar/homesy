const Create = () => {
    const onFormSubmit = e => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        
        let typeOfService = formData.get('typeOfService');
        console.log('typeOfService:', typeOfService)
        let description = formData.get('description');
        console.log('description:', description)
        let price = formData.get('price');
        console.log('price:', price)
        let cityOfOperation = formData.get('cityOfOperation');
        console.log('cityOfOperation:', cityOfOperation)
        let isVaccinated = formData.get('isVaccinated');
        console.log('isVaccinated:', isVaccinated)
        


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
