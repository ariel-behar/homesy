import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

import { useErrorContext } from '../../../../contexts/ErrorContext.js';
import * as homeServicesService from '../../../../services/homeServicesService.js';
import * as favoritesService from '../../../../services/favoritesService.js';

function AuthenticatedNonCreatorButtons({
    user,
    homeServiceId
}) {
    const { displayError } = useErrorContext();
    const [userLiked, setUserLiked] = useState(false)

    useEffect(async () => {
        let homeService = await homeServicesService.getOne(homeServiceId);

        if (homeService.favoriteOf.includes(user.userId)) {
            setUserLiked(true);
        }

    }, [])

    const addToFavoritesHandler = async (e) =>{ 
        e.preventDefault();

        try {
            let addToFavoritesResponse = await favoritesService.addToFavorites(homeServiceId, user);
            
            if(addToFavoritesResponse.favoriteOf.includes(user.userId)){
                setUserLiked(true)
            }

        } catch (error) {
            displayError(await error);
        }
    }

    const removeFromFavoritesHandler = async (e) => {
        e.preventDefault();

        try {
            let removeFromFavoritesResponse = await favoritesService.removeFromFavorites(homeServiceId, user);

            if (!removeFromFavoritesResponse.favoriteOf.includes(user.userId)) {
                setUserLiked(false);
            }
        } catch (error) {
            displayError(await error);
        }

    }

    const addToFavoritesButton = (
        <button onClick={addToFavoritesHandler}>
            Add to Favorites
            <FontAwesomeIcon icon="heart" size="lg" pull="right" />
        </button>
    )

    const removeFromFavoritesButton = (
        <button onClick={removeFromFavoritesHandler}>
            Remove from Favorites
        </button>
    );

    return (
        <>
            {
                userLiked 
                    ? removeFromFavoritesButton
                    : addToFavoritesButton
            }
        </>
    );
}

export default AuthenticatedNonCreatorButtons;
