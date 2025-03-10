const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      required: true,
    },
    profileUrl: {
      type: String,
      default:
        "https://ik.imagekit.io/vjweud5o2/blogify/defaultProfile.png?updatedAt=1740652309543",
    },
  },
  { timestamps: true }
);

userSchema.static("matchPassword", function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return false;
    }
    const salt = user.salt;
    const result=createHmac("sha256", salt).update(password).digest("hex") === user.password
    return result?{email,userId:user._id,role:user.role,name:user.name,profileUrl:user.profileUrl}:false;
  });
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = randomBytes(16).toString();
  user.password = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  user.salt = salt;
  next();
});

module.exports = model("user", userSchema);
