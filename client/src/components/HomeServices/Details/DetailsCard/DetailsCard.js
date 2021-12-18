
import { useAuthContext } from '../../../../contexts/AuthContext.js';

import styles from './DetailsCard.module.scss';

import CreatorUserButtons from '../CreatorUserButtons/CreatorUserButtons.js';
import AuthenticatedNonCreatorButtons from '../AuthenticatedNonCreatorButtons/AuthenticatedNonCreatorButtons.js';

function DetailsCard({
    service,
    homeServiceId
}) {
    const { user, isAuthenticated, isAuthorized } = useAuthContext();

    return (
        <div className={`card ${styles.cardComponent}`}>
            <div className={`card-header ${styles['card-header']}`}>Home Service</div>
            <div className={`card-body ${styles['card-body']}`}>
                <img src={service.imageUrl} className="img-fluid" alt={`${service.typeOfService}`} />
                <h5 className="card-title">{service.typeOfService}</h5>
                <p className="card-text">{service.cityOfOperation}</p>
                <p className="card-text">{service.description}</p>
                <p className="card-text">{service.price} BGN</p>

                {
                isAuthorized(service.creator) 
                    ? <CreatorUserButtons service={service} homeServiceId={homeServiceId} />
                    : isAuthenticated 
                        ? <AuthenticatedNonCreatorButtons user={user} homeServiceId={homeServiceId} />
                        : ''
                }
            </div>
        </div>
    );
}

export default DetailsCard
