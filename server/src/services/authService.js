const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

exports.register = (username, password) => {
    bcrypt.hash(password, 10)
        .then(hash => {
            password = hash;
            User.create({ username, password });
        })
        .catch(error => console.log('An error occurred while hashing password: ', error))
}

