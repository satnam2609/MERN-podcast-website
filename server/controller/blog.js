const slugify = require("slugify");
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  try {
    console.log(req.body.blog);
    req.body.blog.slug = slugify(req.body.blog.title);
    const newBlog = await Blog.create(req.body.blog);

    res.json({
      blog: newBlog,
      success: true,
    });
  } catch (error) {
    console.log("Blog creation error", error);
    res.status(400).json({
      success: false,
      message: "Blog creation failed",
    });
  }
};

exports.list = async (req, res) => {
  try {
    res.json({
      blogs: await Blog.find({}).populate("category").populate("comments"),
      success: true,
    });
  } catch (error) {
    console.log("Blog listing error", error);
    res.status(400).json({
      success: false,
      message: "Blog listing failed",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    res.json({
      blog: await Blog.findOne({ slug: req.params.slug }),
      success: true,
    });
  } catch (error) {
    console.log("Blog reading error", error);
    res.status(400).json({
      success: false,
      message: "Blog reading failed",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
      }
    );

    res.json({
      blog: updatedBlog,
      success: true,
    });
  } catch (error) {
    console.log("Blog updation error", error);
    res.status(400).json({
      success: false,
      message: "Blog updation failed",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleteBlog = await Blog.findOneAndDelete({ slug: req.params.slug });
    res.json({
      blog: deleteBlog,
      success: true,
    });
  } catch (error) {
    console.log("Blog removing error", error);
    res.status(400).json({
      success: false,
      message: "Blog removing failed",
    });
  }
};

exports.related = async (req, res) => {
  try {
    const { category } = req.params;
    const relatedBlogs = await Blog.find({ category: category }).populate(
      "category"
    );

    res.json({
      blogs: relatedBlogs,
      success: true,
    });
  } catch (error) {
    console.log("Blog related error", error);
    res.status(400).json({
      success: false,
      message: "Blog related failed",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text, author, website } = req.body;
    console.log(req.body);

    if (website !== "") {
      const comment = await Comment.create({
        text,
        author: website,
        blogId: req.params.blog,
        date: new Date(),
      });

      const commenteddBlog = await Blog.findOneAndUpdate(
        { _id: req.params.blog },
        { $push: { comments: comment } },
        { new: true }
      ).populate("comments", "comments.subcomments");
      return res.json({
        blog: commenteddBlog,
        success: true,
      });
    } else {
      const comment = await Comment.create({
        text,
        author,
        blogId: req.params.blog,
        date: new Date(),
      });

      const commenteddBlog = await Blog.findOneAndUpdate(
        { _id: req.params.blog },
        { $push: { comments: comment } },
        { new: true }
      ).populate("comments", "comments.subcomments");
      return res.json({
        blog: commenteddBlog,
        success: true,
      });
    }
  } catch (error) {
    console.log("Blog add commenting error", error);
    res.status(400).json({
      success: false,
      message: "Adding comment failed",
    });
  }
};

exports.replyToAuthor = async (req, res) => {
  try {
    const { toAuthor, websiteFrom, fromAuthor, text } = req.body;
    if (toAuthor && websiteFrom && text) {
      // find the toAuthor and then push the reply in the subComment
      const findBlog = await Blog.find({ _id: req.params.blog })
        .populate("comments")
        .select("comments");

      // find the author
      let finalAuthor;
      await findBlog[0].comments.map((obj) => {
        if (obj.author === toAuthor) {
          finalAuthor = obj.author;
        }
      });

      const findComment = await Comment.findOne({ author: finalAuthor });
      if (findComment) {
        // we will add the reply by fromAuthor to toAuthor
        const replyId = await Comment.create({
          author: websiteFrom,
          text: text,
        });
        await Comment.findOneAndUpdate(
          { author: finalAuthor },
          {
            $push: {
              subComments: {
                _id: replyId._id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      return res.json({
        author: await Comment.findOne({ author: finalAuthor }),
        success: true,
      });
    } else if (fromAuthor && text && toAuthor) {
      // find the toAuthor and then push the reply in the subComment
      const findBlog = await Blog.find({ _id: req.params.blog })
        .populate("comments")
        .select("comments");

      // find the author
      let finalAuthor;
      await findBlog[0].comments.map((obj) => {
        if (obj.author === toAuthor) {
          finalAuthor = obj.author;
        }
      });

      const findComment = await Comment.findOne({ author: finalAuthor });
      if (findComment) {
        // we will add the reply by fromAuthor to toAuthor
        const replyId = await Comment.create({
          author: fromAuthor,
          text: text,
        });
        await Comment.findOneAndUpdate(
          { author: finalAuthor },
          {
            $push: {
              subComments: {
                _id: replyId._id,
              },
            },
          },
          {
            new: true,
          }
        );
      }
      return res.json({
        author: await Comment.findOne({ author: finalAuthor }),
        success: true,
      });
    } else {
      return res.json({
        success: false,
        msg: "Please enter all the fields",
      });
    }
  } catch (error) {
    console.log("Blog replying commenting error", error);
    res.status(400).json({
      success: false,
      message: "replying comment failed",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    // find blog
    const blog = await Blog.findOne({ _id: req.params.id })
      .select("comments")
      .populate("comments");
  } catch (error) {
    console.log(" deleting commenting error", error);
    res.status(400).json({
      success: false,
      message: "deleting comment failed",
    });
  }
};

exports.filterBlogs = async (req, res) => {
  try {
    const { query } = req.body;
    console.log(query);
    // const blogs = await Blog.find({ title: { $regex: query, $options: "i" } });
    let pipeline = [];

    // console.log(blogs);
    if (query) {
      pipeline.push({ $match: { title: { $regex: query, $options: "i" } } });
    }

    const blogs = await Blog.aggregate(pipeline);

    res.json({
      blogs: blogs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};
