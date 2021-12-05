const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, 'First name needs to be at least 2 characters long'],
        validate: [/\[a-zA-z]{2,}/i, 'First Name needs to include only characters from the latin alphabet'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, 'Last name needs to be at least 2 characters long'],
        validate: [/\[a-zA-z]{2,}/i, 'Last Name needs to include only characters from the latin alphabet'],
    },
    email: {
        type: String,
        required: true,
        validate: [/^\w+@\w+\..+/, 'The format of the e-mail address needs to be *****@*****.com'],
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;