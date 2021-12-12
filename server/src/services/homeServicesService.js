const HomeService = require('../models/HomeService.js');

exports.create = (homeService) => HomeService.create(homeService);

exports.getOne = homeServiceId => HomeService.findById(homeServiceId).lean();

exports.getAll = () => HomeService.find({}).lean();

exports.getAllByUser = (userId) => HomeService.find({creator: userId}).lean();

exports.updateOne = (homeServiceId, homeService) => HomeService.findByIdAndUpdate(homeServiceId, homeService, { new: true });

exports.deleteOne = (homeServiceId) => HomeService.findByIdAndDelete(homeServiceId);