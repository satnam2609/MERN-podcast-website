const Comment = require("../model/comment");

exports.getComments = async (req, res) => {
  try {
    res.json({
      comments: await Comment.find({ blogId: req.params.blog }).populate(
        "subComments"
      ),
      success: true,
    });
  } catch (error) {
    console.log("Comments error", error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
