import {  Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

import * as homeServicesService from '../../../../services/homeServicesService.js';
import { useErrorContext } from '../../../../contexts/ErrorContext.js';
import { useAuthContext } from '../../../../contexts/AuthContext.js';
import ConfirmationModal from '../../../Common/ConfirmationModal/ConfirmationModal.js';

function CreatorUserButtons({
    service,
    homeServiceId, 
}) {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { displayError } = useErrorContext();
    const [ showModal, setShowModal ] = useState(false)

    const onDeleteButtonClick = async e => {
        e.preventDefault();

        setShowModal(true);
    };

    const deleteHandler = async () => {
        setShowModal(false);

        try {
            await homeServicesService.deleteOne(homeServiceId, user.AUTH_TOKEN);

            navigate('/home-services/all-listings');
        } catch (error) {
            displayError(await error);
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
            {showModal
                ? <ConfirmationModal 
                    showModal={showModal} 
                    onClose={() => setShowModal(false)} 
                    onSave={deleteHandler}
                    />
                : ''
            
            }
        </>
    );
}

export default CreatorUserButtons;
