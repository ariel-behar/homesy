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
            .catch(error => {
                if (error.message === 'data and salt arguments required') {
                    throw { code: 500, message: 'An error occurred while attempting to sign you up. Please try again ' };
                }
                
                throw error;
            });
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


