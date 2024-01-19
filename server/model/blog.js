const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxLength: 100,
    text: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: Object,
    required: true,
  },
  introduction: {
    type: String,
  },
  contents: [
    {
      type: Object,
    },
  ],
  ytLink: {
    type: String,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
