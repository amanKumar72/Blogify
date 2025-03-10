const { verifyToken } = require("../service/JWTService")

const authenticatedRoute=(req,res,next)=>{
    const token = req.cookies['token']
    if(!token){
        return res.redirect("/signin")
    }
    const user=verifyToken(token)
    if(user){
        req.user=user
        return next()
    }
    return res.redirect("/signin")
}

module.exports={authenticatedRoute}