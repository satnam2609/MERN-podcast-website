const mongoose = require("mongoose");

const podcastSchema = mongoose.Schema(
  {
    image: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    link: {
      type: String,

      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast;
