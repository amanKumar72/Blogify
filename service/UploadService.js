const fs = require("fs");
const multer = require("multer");
const path = require("path");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

//apply filter for onlu images 
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif","image/webp"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, true);
};

//storage for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Save files in the "public/uploads" folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Unique filename
  },
});

const upload = multer({ storage,fileFilter });

module.exports = upload;
