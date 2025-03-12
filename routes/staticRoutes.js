
const router = require("express").Router();
const {authenticatedRoute}=require("../middlewares");
const Blog = require("../models/blog");

router.get("/",async (req,res)=>{
    const blogs=await Blog.find({})
    return res.render("home",{req,blogs,error:''})
})

router.get("/blog/:blogid",async (req,res)=>{
    const blog=await Blog.findOne({_id:req.params.blogid})
    if(!blog){
        return res.status(404).json({error:"blog not found"})
    }
    return res.render("blog",{req,blog,error:''});
})

router.get("/profile",authenticatedRoute,async (req,res)=>{
    const blogsOfUser=await Blog.find({createdBy:req.user.userId})
    return res.render("profile",{req,blogs:blogsOfUser,error:''})
})

router.get("/addBlog",authenticatedRoute,(req,res)=>{
    return res.render("addBlog",{  error:'',req})
})

router.get("/signup",(req,res)=>{
    return res.render("signup",{
        error:'',req
    })
})

router.get("/signin",(req,res)=>{
    return res.render("signin",{
        error:'',req
    })
})

module.exports=router