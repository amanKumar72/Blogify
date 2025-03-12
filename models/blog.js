const { Schema, model } = require("mongoose");

/**
 * Blog schema
 *
 * Represents a blog post
 *
 * @typedef {Object} Blog
 * @property {string} title - The title of the blog post
 * @property {string} body - The body of the blog post
 * @property {string} coverImageUrl - The URL of the cover image
 * @property {ObjectId} createdBy - The user who created the blog post
 * @property {Date} createdAt - The date the blog post was created
 * @property {Date} updatedAt - The date the blog post was last updated
 */
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
      default:"uploads/defaultImage.jpg"
      },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("blog", blogSchema);
