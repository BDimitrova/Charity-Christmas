const Toys = require('../models/Toys');
const User = require('../models/User');

exports.create = (toyData) => Toys.create(toyData);

exports.getAll = () => Toys.find().lean();

exports.getOne = (toyId) => Toys.findById(toyId).populate('buyingList');

exports.getMyWishBook = (userId) => Toys.find({ buyingList: userId}).lean();

exports.update = (toyId, toyData) => Toys.findByIdAndUpdate(toyId, toyData);

exports.delete = (toyId) => Toys.findByIdAndDelete(toyId);