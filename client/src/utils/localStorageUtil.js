export const getLocalStorage = initialUserState => {
    try {
        let userId = localStorage.getItem('userId');
        let firstName = localStorage.getItem('firstName');
        let email = localStorage.getItem('email');
        let AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');

        let userObj = {
            
            userId,
            firstName,
            email,
            AUTH_TOKEN,
        };

        return (userId && firstName && email && AUTH_TOKEN) 
            ? userObj 
            : initialUserState;
    } catch (error) {
        throw new Error({code: 400, message: 'An error occured while retrieving user data'});
    }
};

export const setLocalStorage = ({userId, firstName, email, AUTH_TOKEN}) => {
    try {
        localStorage.setItem('userId', userId);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('email', email);
        localStorage.setItem('AUTH_TOKEN', AUTH_TOKEN);
    } catch (error) {
        throw new Error({ code: 400, message: 'An error occured while setting user data' });
    }
};

export const clearLocalStorage = () => {
    localStorage.clear();
}