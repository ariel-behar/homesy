import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" src={listing.imageUrl} alt="Card" />
                <div className="card-body">
                    <h5 className="card-title">{listing.service}</h5>
                    <p className="card-text">{listing.description}</p>
                    <Link to={`/details/${listing._id}`} className="btn btn-primary">
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
