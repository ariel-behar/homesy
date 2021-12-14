export const getLocalStorage = initialUserState => {
    try {
        let user = JSON.parse(localStorage.getItem('user'));

        return user
            ? user 
            : initialUserState;
    } catch (error) {
        console.log(error);
        throw new Error({code: 400, message: 'An error occured while retrieving user data'});
    }
};

export const setLocalStorage = (user) => {
    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        throw new Error({ code: 400, message: 'An error occured while setting user data' });
    }
};

export const clearLocalStorage = () => {
    localStorage.clear();
}