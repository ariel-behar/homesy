const bcrypt = require('bcrypt');

const User = require('../models/User.js');

exports.register = (user) => User.create(user);

exports.login = async (email, password) => {
    let user = await User.findOne({email}).lean();

    if(!user) {
        throw { code: 400, message: 'Invalid username or password' };
    }

    let isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        return {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
        };
    } else {
        throw { code: 400, message: 'Invalid username or password' };
    }
       
}


