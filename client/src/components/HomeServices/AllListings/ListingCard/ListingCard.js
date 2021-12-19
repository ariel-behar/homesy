import { Link } from 'react-router-dom';

import styles from './ListingCard.module.scss'

import typesOfServices from '../../../../data/typesOfServices.json';

const ListingCard = ({ 
    service
}) => {
     return (
        <div className={`card ${styles.cardStyles}`}>
            <img className="card-img-top" src={service.imageUrl} alt="Card" className="img-fluid"/>
            <div className={`card-body ${styles.cardBody}`}>
                <h5 className="card-title">{typesOfServices.find(x => x.value == service.typeOfService).name}</h5>
                <p className="card-text">{service.cityOfOperation}</p>
                <p className="card-text">{service.price} BGN</p>
                <Link to={`/home-services/${service._id}`} state={{ from: service }} className={`btn btn-primary ${styles.cardButton}`}>
                    See more...
                </Link>
            </div>
        </div>
    );
};

export default ListingCard;
