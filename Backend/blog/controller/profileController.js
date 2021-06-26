const Post = require("../models/Post");

exports.getUserPosts = async (req, res, next) => {
  const userName = req.body.user;
  try {
    const userPosts = await Post.find({ user: userName });
    res.status(200).send(userPosts);
  } catch (error) {
    next(error);
  }
};
