const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters.",
    },
    required: [true, "Name is required."],
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost",
    },
  ],
});

UserSchema.virtual("postCount").get(function () {
  if (this.posts) {
    return this.posts.length;
  }

  return 0;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
