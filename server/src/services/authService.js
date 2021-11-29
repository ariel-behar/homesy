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

