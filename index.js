require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require("mongoose");
const cookieParser=require('cookie-parser')

const authRouter = require("./routes/auth");
const staticRouter = require("./routes/staticRoutes");
const blogRouter=require("./routes/blog")
const userRouter=require("./routes/user")
const app = express();
const PORT = process.env.PORT || 8080;

//set ejs
app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"views"))

//moddlewares
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")))


//connecting mongodb
connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log("moongo error : ", err);
  });


  app.use("/api/auth", authRouter);
  app.use("/api/blog",blogRouter)
  app.use("/api/user",userRouter)
  app.use("/", staticRouter);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
