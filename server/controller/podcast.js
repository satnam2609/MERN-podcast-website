const { default: slugify } = require("slugify");
const Podcast = require("../model/podcast");
const Category = require("../model/category");

exports.create = async (req, res) => {
  try {
    req.body.podcast.slug = slugify(req.body.podcast.title);
    console.log(req.body.podcast);
    const newPodcast = await Podcast.create(req.body.podcast);
    res.json({
      podcast: newPodcast,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Podcast creation failed",
    });
  }
};

exports.list = async (req, res) => {
  try {
    res.json({
      podcast: await Podcast.find({})
        .populate("category")
        .sort({ createdAt: -1 }),
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Podcast listing failed",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { slug } = req.params;

    res.json({
      podcast: await Podcast.findOne({ slug: slug }),
      success: true,
    });
  } catch (error) {
    console.log("Podcast reading error", error);
    res.status(400).json({
      success: false,
      message: "Podcast read failed",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;

    const removedPodcast = await Podcast.findOneAndDelete({ slug: slug });
    res.json({
      podcast: removedPodcast,
      success: true,
    });
  } catch (error) {
    console.log("Podcast removing error", error);
    res.status(400).json({
      success: false,
      message: "Podcast removing failed",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { slug } = req.params;

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedPodcast = await Podcast.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });

    res.json({
      podcast: updatedPodcast,
      success: true,
    });
  } catch (error) {
    console.log("Podcast updating error", error);
    res.status(400).json({
      success: false,
      message: "Podcast updating failed",
    });
  }
};

exports.related = async (req, res) => {
  try {
    const { category } = req.params;
    const podcasts = await Podcast.find({ category: category }).populate(
      "category"
    );

    res.json({
      podcasts,
      success: true,
    });
  } catch (error) {
    console.log("Podcast realted error", error);
    res.status(400).json({
      success: false,
      message: "Podcast related failed",
    });
  }
};
