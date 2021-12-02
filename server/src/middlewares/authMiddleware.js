const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.isAuth = function (req, res, next) {
    let userAuthToken = req.headers['auth-token']

    if (!userAuthToken) {
        return next();
    }

    let decodedToken =  jwt.verify(userAuthToken, process.env.AUTH_TOKEN_SECRET)

    res.locals.user = decodedToken;
    req.user = decodedToken;

    next();
}