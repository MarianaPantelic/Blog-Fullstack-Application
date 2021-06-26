const express = require("express");
const router = express.Router();

const { getUserPosts } = require("../controller/profileController");

router.route("/").get(getUserPosts);

module.exports = router;
