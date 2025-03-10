
const router = require("express").Router();
const {authenticatedRoute}=require("../middlewares");
const Blog = require("../models/blog");

router.get("/",async (req,res)=>{
    const blogs=await Blog.find({})
    return res.render("home",{req,blogs,error:''})
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