const jwt = require('jsonwebtoken');
require('dotenv').config();
//Continue from here
exports.isAuth = function (req, res, next) {
    let userAuthToken = req.headers['auth-token']

    if (!userAuthToken) { 
        return next();
    }

    try {
        jwt.verify(userAuthToken, process.env.AUTH_TOKEN_SECRET, function(err, decodedToken){
            if (err) {
                throw err;
            } else {
                res.locals.user = decodedToken;
                req.user = decodedToken;

                next();
            }
        })
    } catch (error) {
        console.log('My error', error)
        res.status(500).json({ code: 500, message: 'A problem occurred during authentication' });
    }


}