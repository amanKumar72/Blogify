const router = require("express").Router();
const Blog = require("../models/blog");
const { authenticatedRoute } = require("../middlewares");
const {upload, removeImage} = require("../service/UploadService");
const { isValidObjectId } = require("mongoose");

router.post("/add", authenticatedRoute, (req, res) => {
  try {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.render("addBlog", {
          error: "Cover image must be image",
        });
      }
      const { title, content } = req.body;
      if (!title || !content) {
        return res.render("addBlog", {
          error: "title and content are required",
        });
      }
      const blog = await Blog.create({
        title,
        body: content,
        coverImageUrl: req.file?.filename,
        createdBy: req.user.userId,
      });
      res.redirect("/");
    });
  } catch (err) {
    return res.render("addBlog", { error: "Cover image must be image" });
  }
});

router.post("/delete/:blogid", authenticatedRoute, async (req, res) => {
  if (!isValidObjectId(req.params.blogid)) {
    return res.render("NotFound", { req, error: "Invalid blog id" });
  }
  const blog = await Blog.findById(req.params.blogid);
  if (!blog) {
    return res.render("NotFound", { req, error: "Blog not found" });
  }
  if (blog.createdBy.toString() !== req.user.userId.toString()) {
    return res.status(401).json({ error: "unauthorized" });
  }
  removeImage(blog.coverImageUrl);
  await blog.deleteOne();
  res.redirect("/profile");
});

router.post("/edit/:blogid", authenticatedRoute, async (req, res) => {
  if (!isValidObjectId(req.params.blogid)) {
    return res.render("NotFound", { req, error: "Invalid blog id" });
  }
  upload.single("file")(req, res, async (err) => {
    const blog = await Blog.findById(req.params.blogid).populate("createdBy");
    if (err) {
      return res.render("EditBlog", {
        error: "Cover image must be image",
        req,
        blog,
      });
    }

    if (!blog) {
      return res.render("NotFound", { req, error: "Blog not found" });
    }
    if (blog.createdBy._id.toString() !== req.user.userId.toString()) {
      return res.render("NotFound", { req, error: "unauthorized user" });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.render("EditBlog", {
        req,
        error: "title and content are required",
        blog,
      });
    } 
    blog.title = title;
    blog.body = content;
    removeImage(blog.coverImageUrl);
    blog.coverImageUrl=req.file?.filename;
    await blog.save();
    res.redirect("/");
  });
});

module.exports = router;
