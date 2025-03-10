const router = require("express").Router();
const Blog = require("../models/blog");
const { authenticatedRoute } = require("../middlewares");
const upload = require("../service/UploadService");

router.post("/", authenticatedRoute, async (req, res) => {
  try {
    let error = false;
    await upload.single("file")(req, res, (err) => {
      if (err) {
        error = true;
      }
    });

    if (error) {
      return res.render("addBlog", { error: "Cover image must be image" });
    }

    const { title, body } = req.body;
    if (!title || !body) {
      return res.render("addBlog", { error: "title and body are required" });
    }
    const blog = Blog.create({
      title,
      body,
      coverImageUrl: req.file?.filename || "defaultCover.png",
      createdBy: req.user.userId,
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    console.log("after error");
    return res.render("addBlog", { error: "Cover image must be image" });
  }
});

module.exports = router;
