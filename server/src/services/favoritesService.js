const HomeService = require('../models/HomeService.js');

exports.addToFavorites = (homeServiceId, userId) => HomeService.findByIdAndUpdate(homeServiceId, { $addToSet: { favoriteOf: userId } }, { new: true });

exports.removeFromFavorites = (homeServiceId, userId) => HomeService.findByIdAndUpdate(homeServiceId, { $pull: { favoriteOf: userId } }, { new: true });

exports.getUserFavorites = (userId) => HomeService.find({favoriteOf: userId}).lean();