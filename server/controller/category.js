const Category = require("../model/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    res.json({
      category: await Category.create({ name, slug: slugify(name) }),
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Create category failed",
    });
  }
};

exports.list = async (req, res) => {
  try {
    res.json({
      categories: await Category.find({}),
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Cannot get categories",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json({
      category: await Category.find({ slug: req.params.slug }),
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Cannot get category",
    });
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    console.log(updated);
    res.json({
      category: updated,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "category update failed",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const RemovedCategory = await Category.findOneAndDelete({ slug: slug });
    res.json({
      success: true,
      category: RemovedCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Create delete failed",
    });
  }
};
