const mongoose = require('mongoose');

const homeServiceSchema = mongoose.Schema({
    typeOfService: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cityOfOperation: {
        type: String,
        required: true,
    },
    isVaccinated: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const HomeService = mongoose.model('HomeService', homeServiceSchema);

module.exports = HomeService;