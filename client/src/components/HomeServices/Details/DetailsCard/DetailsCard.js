
import { useAuthContext } from '../../../../contexts/AuthContext.js';

import styles from './DetailsCard.module.scss';
import typesOfServices from '../../../../data/typesOfServices.json'

import CreatorUserButtons from '../CreatorUserButtons/CreatorUserButtons.js';
import AuthenticatedNonCreatorButtons from '../AuthenticatedNonCreatorButtons/AuthenticatedNonCreatorButtons.js';

function DetailsCard({
    service,
    homeServiceId
}) {
    const { user, isAuthenticated, isAuthorized } = useAuthContext();

    return (
        <div className={`card ${styles.cardComponent}`}>
            <div className={`card-header ${styles['card-header']}`}>{typesOfServices.find(x => x.value == service.typeOfService).name}</div>
            <div className={`card-body ${styles['card-body']}`}>
                <img src={service.imageUrl} className="img-fluid" alt={`${service.typeOfService}`} />
                {/* <h5 className="card-title">{typesOfServices.find(x => x.value == service.typeOfService).name}</h5> */}
                <p className="card-text"><span>City:</span> {service.cityOfOperation}</p>
                <p className="card-text"><span>Description:</span> {service.description}</p>

                <div>
                    <p className="card-text"><span>Price: </span>{service.price} BGN</p>

                    {isAuthorized(service.creator) ? (
                        <CreatorUserButtons service={service} homeServiceId={homeServiceId} />
                    ) : isAuthenticated ? (
                        <AuthenticatedNonCreatorButtons user={user} homeServiceId={homeServiceId} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsCard
