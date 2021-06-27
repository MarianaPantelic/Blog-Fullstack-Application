const mongoose = require("mongoose");
const { Schema } = mongoose;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt
    .sign({ _id: user._id.toHexString() }, "FWB43-2-110%")
    .toString();
  return token;
};

UserSchema.methods.getPublicFields = function () {
  var returnObject = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    _id: this._id,
  };
  return returnObject;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, "FWB43-2-110%");
  } catch (error) {
    console.log(error);
    return;
  }
  return User.findOne({ _id: decoded._id });
};

UserSchema.methods.checkPassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
