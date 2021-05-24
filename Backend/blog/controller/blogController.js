const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const isEmpty = require("lodash.isempty");

exports.getPosts = (req, res) => {
  try {
    const posts = db.get("posts").value();
    console.log(posts);
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
};

exports.addPost = (req, res, next) => {
  try {
    if (isEmpty(req.body.name)) {
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
      const post = req.body;
      console.log(post);
      db.get("posts")
        .push(post)
        .last()
        .assign({
          id: Date.now().toString(),
        })
        .write();
      res.status(201).send(post);
    }
  } catch (error) {
    console.log(error);
    //forward the error to the error handler
    next(error);
  }
};

exports.deletePost = (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
      const inputId = req.body.id;
      db.get("posts").remove({ id: inputId }).write();
      res.status(200).send("Success");
    }
  } catch (error) {
    console.log(error);
  }
};
