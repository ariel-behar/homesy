import { Link } from 'react-router-dom';

const ListingCard = ({ 
    service
}) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" src={service.imageUrl} alt="Card" />
                <div className="card-body">
                    <h5 className="card-title">{service.typeOfService}</h5>
                    <p className="card-text">{service.description}</p>
                    <p className="card-text">{service.price} BGN</p>
                    <Link 
                    to={`/home-services/${service._id}`} 
                    state={{from: service}}
                    className="btn btn-primary">
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
