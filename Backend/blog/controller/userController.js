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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = new User(req.body);
    /*RETRIEVE A TOKEN FROM THE USER */
    const token = user.generateAuthToken();
    await user.save();
    /*SEND BACK THE TOKEN WITH PuBLIC FIELDS */
    const data = user.getPublicFields();
    res.status(200).header("x-auth", token).send(data);
  } catch (e) {
    next(e);
  }
};

/*SIGNING IN */
exports.loginUser = async (req, res, next) => {
  //Get email and password from the request
  const email = req.body.email;
  const password = req.body.password;
  try {
    //Find the user in the Database
    const user = await User.findOne({ email });
    //Checking if the password is correct
    const valid = await user.checkPassword(password);
    if (!valid) throw new createError.NotFound();
    //Retrieve a token
    const token = user.generateAuthToken();
    const data = user.getPublicFields();
    //Respond with token and public FIELDS
    res.status(200).header("x-auth", token).send(data);
  } catch (error) {
    next(error);
  }
};
