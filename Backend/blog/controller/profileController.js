const Post = require("../models/Post");

exports.getUserPosts = async (req, res, next) => {
  const userName = req.body.user;
  console.log(userName);
  try {
    const userPosts = await Post.find({ user: userName });
    res.status(200).send(userPosts);
    console.log(userPosts);
  } catch (error) {
    next(error);
  }
};
