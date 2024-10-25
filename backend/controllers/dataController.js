const Data = require('../models/Data');

exports.getManagerData = async (req, res) => {
  const user = req.user;
  // Logic to get specific data based on manager's entities
  const data = await Data.findAll({ where: { managerId: user.id } });
  res.json(data);
};

exports.getUserData = async (req, res) => {
  const user = req.user;
  // Logic to get user-specific data
  const data = await Data.findAll({ where: { userId: user.id } });
  res.json(data);
};

exports.addData = async (req, res) => {
  const data = await Data.create(req.body);
  res.status(201).json(data);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
