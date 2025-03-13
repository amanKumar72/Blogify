const { authenticatedRoute } = require("../middlewares");
const User = require("../models/user");
const { generateToken } = require("../service/JWTService");
const {upload, removeImage} = require("../service/UploadService");

const router = require("express").Router();

router.post("/editProfile",authenticatedRoute,(req,res)=>{
    try {
        upload.single("file")(req, res, async (err) => {
            if (err) {
              return res.render("EditProfile", {
                error: "Profile image must be image",
              });
            }
            const { name, email } = req.body;
            if (!name || !email ) {
              return res.render("EditProfile", {
                error: "name, email and password are required",
              });
            }
            const user = await User.findById(req.user.userId);

            if(user.name===name && user.email===email && user.profileUrl===req.file?.filename){
                return res.render("EditProfile", {
                    error: "No changes made",
                  });
            }
            user.name = name;
            user.email = email;
            removeImage(user.profileUrl)
            user.profileUrl = req.file?.filename 
            await user.save();
            
            const token = generateToken({
                email,
                userId: user._id,
                role: user.role,
                name: user.name,
                profileUrl: user.profileUrl,
              });
            res.cookie("token", token).redirect("/profile");
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports=router