const router = require("express").Router();
const Blog = require("../models/blog");
const { authenticatedRoute } = require("../middlewares");
const upload = require("../service/UploadService");

router.post("/", authenticatedRoute, (req, res) => {
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

router.delete("/delete/:blogid",authenticatedRoute,async (req,res)=>{
    const blog=await Blog.findById(req.params.blogid)
    if(!blog){
        return res.status(404).json({error:"blog not found"})
    }
    if(blog.createdBy.toString() !== req.user.userId.toString()){
        return res.status(401).json({error:"unauthorized"})
    }
    await blog.deleteOne()
    res.redirect("/profile")
})

router.put("/edit/:blogid",authenticatedRoute,async (req,res)=>{
    const blog=await Blog.findById(req.params.blogid)
    if(!blog){
        return res.status(404).json({error:"blog not found"})
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.render("addBlog", {
        error: "title and content are required",
      });
    }
    blog.title = title;
    blog.body = content;
    await blog.save();
    res.redirect("/profile");
})

module.exports = router;
