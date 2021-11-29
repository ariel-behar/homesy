const mongoose = require('mongoose');

const User = require('../models/User.js');

exports.getAll = () => User.find();

