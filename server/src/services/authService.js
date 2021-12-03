const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User.js');

exports.register = (firstName, lastName, email, password) => {
    return bcrypt
            .hash(password, Number(process.env.JWT_SALT))
            .then(hash => {
                password = hash;
                return User.create({ firstName, lastName, email, password });
            })
            .catch(error => console.log('An error occurred while hashing password: ', error));
};

exports.login = async (email, password) => {
    let user = await User.findOne({email}).lean();

    if(!user) {
        throw new Error('Invalid username or password');
    }

    let isValid = await bcrypt.compare(password, user.password);

    if(isValid) {
        return {
            userId: user._id, 
            firstName: user.firstName, 
            email: user.email
        }
    } else {
        throw new Error('invalid user');
    }
}


