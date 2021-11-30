const HomeService = require('../models/HomeService.js');

exports.create = (homeService) => HomeService.create(homeService);

exports.getAll = () => HomeService.find({}).lean();

exports.getOne = homeServiceId => HomeService.find({ _id: homeServiceId }).lean();

exports.updateOne = (homeServiceId, homeService) => HomeService.findByIdAndUpdate(homeServiceId, homeService);

exports.deleteOne = (homeServiceId) => HomeService.findByIdAndDelete(homeServiceId);