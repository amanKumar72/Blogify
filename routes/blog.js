const router = require("express").Router();
const Blog = require("../models/blog");
const { authenticatedRoute } = require("../middlewares");
const upload = require("../service/UploadService");

router.post("/add", authenticatedRoute, (req, res) => {
  try {
     upload.single("file")(req, res, async (err) => {
      if (err) {
        return  res.render("addBlog", {
          error: "Cover image must be image",
        });;
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
        coverImageUrl: req.file?.filename || "defaultImage.png",
        createdBy: req.user.userId,
      });
      res.redirect("/");
    });

  } catch (err) {
    console.log(err);
    console.log("after error");
    return res.render("addBlog", { error: "Cover image must be image" });
  }
});

module.exports = router;
