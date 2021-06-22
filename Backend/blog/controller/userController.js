const User = require("../models/User");
const createError = require("http-errors");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const token = user.generateAuthToken();
    await user.save();
    const data = user.getPublicFields();
    res.status(200).header("x-auth", token).send(data);
  } catch (e) {
    next(e);
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    const valid = await user.checkPassword(password);
    if (!valid) throw new createError.NotFound();
    const token = user.generateAuthToken();
    const data = user.getPublicFields();
    res.status(200).header("x-auth", token).send(data);
  } catch (error) {
    next(error);
  }
};
