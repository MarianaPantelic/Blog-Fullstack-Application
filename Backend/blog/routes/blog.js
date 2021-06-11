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
  updatePost,
  getPost,
  increaseLikes,
} = require("../controller/blogController");

router.route("/").get(getPosts).post(addPost);

router
  .route("/:id")
  .get(getPost)
  .delete(deletePost)
  .put(updatePost)
  .put(increaseLikes);

module.exports = router;
