import {  Link, useNavigate } from 'react-router-dom';
import * as homeServicesService from '../../../../services/homeServicesService.js';
import ErrorContext from '../../../../contexts/ErrorContext.js';
import { useContext } from 'react';
import { useAuthContext } from '../../../../contexts/AuthContext.js';

function CreatorUserButtons({
    service,
    homeServiceId, 
}) {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { displayError } = useContext(ErrorContext);

    const onDeleteButtonClick = async e => {
        e.preventDefault();

        let userResponse = window.confirm('Are you sure you want to delete this service?');

        if (userResponse) {
            try {
                await homeServicesService.deleteOne(homeServiceId, user.AUTH_TOKEN);

                navigate('/home-services/all-listings');
            } catch (error) {
                displayError(await error);
            }
        }
    };

    return (
        <>
            <Link to={`/home-services/${service._id}/edit`} className="btn btn-primary">
                Edit
            </Link>
            <button className="btn btn-danger" onClick={onDeleteButtonClick}>
                Delete
            </button>
        </>
    );
}

export default CreatorUserButtons;
