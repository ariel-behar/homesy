const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User.js');

exports.register =  (username, password) => {
    return bcrypt.hash(password, Number(process.env.JWT_SALT))
            .then(hash => {
                password = hash;
                return User.create({ username, password });
            })
            .catch(error => console.log('An error occurred while hashing password: ', error))
}

exports.login = async (username, password) => {
    let user = await User.findOne({username}).lean();
    console.log('user:', user)

    if(!user) {
        throw new Error('Invalid username or password');
    }

    let isValid = await bcrypt.compare(password, user.password);

    if(isValid) {
        return {userId: user._id, username: user.username}
    } else {
        throw new Error('invalid user');
    }
}

