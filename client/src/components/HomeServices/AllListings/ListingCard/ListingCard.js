import { Link } from 'react-router-dom';

import styles from './ListingCard.module.css'

const ListingCard = ({ 
    service
}) => {
    return (
        <div className={`card ${styles.cardStyles}`}>
            <img className="card-img-top" src={service.imageUrl} alt="Card" />
            <div className="card-body">
                <h5 className="card-title">{service.typeOfService}</h5>
                <p className="card-text">{service.cityOfOperation}</p>
                <p className="card-text">{service.price} BGN</p>
                <Link to={`/home-services/${service._id}`} state={{ from: service }} className="btn btn-primary">
                    See more
                </Link>
            </div>
        </div>
    );
};

export default ListingCard;
