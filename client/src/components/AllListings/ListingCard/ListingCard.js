const ListingCard = ({
    listing
}) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" src={listing.imageUrl} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{listing.service}</h5>
                    <p className="card-text">{listing.description}</p>
                    <a href="#" className="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
