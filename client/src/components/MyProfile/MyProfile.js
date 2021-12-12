import { useContext, useEffect, useState } from "react";

import * as homeServicesService from '../../services/homeServicesService.js';
import { useAuthContext} from '../../contexts/AuthContext.js'
import ErrorContext from "../../contexts/ErrorContext.js";

function MyProfile() {
    const { user } = useAuthContext();
    const { displayError } = useContext(ErrorContext)

    const [ myListings, setMyListings ] = useState([]);
    const [ myFavories, setMyFavorites ] = useState([]);

    useEffect(() => {
        // homeServicesService.getAllbyUser(user)
        //     .then(res => {
        //         console.log(res);
        //     })
        Promise.all([homeServicesService.getAllbyUser(user), homeServicesService.getAllUserFavorites(user)])
            .then(res => {
                console.log(res[0]);
            })
            .catch(err => {
                displayError(err);
            });
    }, [])

    return (
        <div>
            bls
        </div>
    )
}

export default MyProfile
