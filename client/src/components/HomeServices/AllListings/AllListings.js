import styles from './AllListings.module.css'
import ListingCard from './ListingCard/ListingCard.js';

const Listings = () => {
    const listings = [
        {
            _id: 1,
            service: 'Plumber',
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            imageUrl: 'https://ichef.bbci.co.uk/news/624/mcs/media/images/80319000/jpg/_80319922_183953925.jpg',
        },
        {
            _id: 2,
            service: 'Chinese',
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            imageUrl: 'https://www.open.edu/openlearn/ocw/pluginfile.php/2656496/mod_resource/content/0/l197_1_cover_image_1.jpg',
        },
        {
            _id: 3,
            service: 'Barber',
            description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            imageUrl: 'https://i.ytimg.com/vi/Be-IWz7Q2rM/maxresdefault.jpg',
        },
    ];
    return (
        <div className="row">
            {listings.map(x => (
                <ListingCard key={x._id} listing={x} />
            ))}
        </div>
    );
};

export default Listings;
