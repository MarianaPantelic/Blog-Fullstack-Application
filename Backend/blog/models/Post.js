const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
    ops: {
      type: Array,
      insert: {
        type: String,
        required: true,
      },
      insert: {
        type: Object,
        image: {
          data: Buffer,
          contentType: String,
        },
      },
    },
  },
  clicked: {
    type: Boolean,
  },
  likes: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", PostSchema);
