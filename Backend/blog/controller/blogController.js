const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
//const isEmpty = require("lodash.isempty");

const Post = require("../models/Post");

//USING LOWDB
/* exports.getPosts = (req, res) => {
  try {
    const posts = db.get("posts").value();
    console.log(posts);
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
}; */

//USING MONGODB
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

//USING LOWDB
/* exports.addPost = (req, res, next) => {
  try {
    if (isEmpty(req.body.title)) {
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
}; */

//USING MONGODB
exports.addPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
};

//USING MONGODB
exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

//USING LOWDB
/* exports.deletePost = (req, res, next) => {
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
}; */

//USING MONGODB
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

//USING MONGODB
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, dt, { new: true });
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

exports.increaseLikes = async (req, res, next) => {
  const { id } = req.params;
  const dt = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, dt, { new: true });
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};
