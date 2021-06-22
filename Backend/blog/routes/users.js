const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  addUser,
  loginUser,
} = require("../controller/userController");

router.route("/").get(getUsers).post(addUser);

router.route("/login").post(loginUser);

router.route("/:id").get(getUser);

module.exports = router;
