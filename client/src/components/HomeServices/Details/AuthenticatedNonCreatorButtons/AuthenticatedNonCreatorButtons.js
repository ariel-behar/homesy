import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AuthenticatedNonCreatorButtons() {
    return (
        <button>
            Add to Favorites
            <FontAwesomeIcon icon="heart" size="lg" pull="right" />
        </button>
    );
}

export default AuthenticatedNonCreatorButtons;
