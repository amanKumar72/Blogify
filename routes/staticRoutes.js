const router = require("express").Router();
const { authenticatedRoute } = require("../middlewares");
const Blog = require("../models/blog");
const { isValidObjectId } = require("mongoose");

router.get(["/", "/blogs", "/home"], async (req, res) => {
  const blogs = await Blog.find({});

  return res.render("home", { req, blogs, error: "" });
});

router.get("/blog/:blogid", async (req, res) => {
  try {
    if (!isValidObjectId(req.params.blogid)) {
      return res.render("NotFound", { req, error: "Invalid blog id" });
    }
    const blog = await Blog.findById(req.params.blogid).populate("createdBy");
    if (!blog) {
      return res.render("NotFound", { req, error: "Blog not found" });
    }
    return res.render("blog", { req, blog, error: "" });
  } catch (error) {
    console.log("some error occured in getting the blog", error);
    return res.render("NotFound", { req, error: "Blog not found" });
  }
});

router.get("/profile", authenticatedRoute, async (req, res) => {
  try {
    const blogsOfUser = await Blog.find({ createdBy: req.user.userId });
    return res.render("profile", { req, blogs: blogsOfUser, error: "" });
  } catch (error) {
    console.log("some error occured in getting the profile", error);
    return res.render("NotFound", { req, error });
  }
});

router.get("/addBlog", authenticatedRoute, (req, res) => {
  return res.render("addBlog", { error: "", req });
});

router.get("/editBlog/:blogId", authenticatedRoute, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.blogId)) {
      return res.render("NotFound", { req, error: "Invalid blog id" });
    }
    const blog = await Blog.findById(req.params.blogId).populate("createdBy");

    if (!blog) {
      return res.render("NotFound", { req, error: "Blog not found" });
    }
    if (blog.createdBy._id.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ error: "unauthorized" });
    }
    return res.render("EditBlog", { error: "", req, blog });
  } catch (error) {
    console.log("some error occured in editing the blog", error);
    return res.render("NotFound", { req, error });
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup", {
    error: "",
    req,
  });
});

router.get("/signin", (req, res) => {
  return res.render("signin", {
    error: "",
    req,
  });
});

router.get("/editProfile", authenticatedRoute, (req, res) => {
  return res.render("EditProfile", { error: "", req });
});

module.exports = router;
