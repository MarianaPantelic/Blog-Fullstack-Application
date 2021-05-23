const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const {
  getPosts,
  addPost,
  deletePost,
} = require("../controller/blogController");

router.route("/").get(getPosts).post(addPost).delete(deletePost);

module.exports = router;
