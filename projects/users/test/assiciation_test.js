const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  let joe, blogPost, comment;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });
    comment = new Comment({ content: "Congrats on great post" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    await joe.save();
    await blogPost.save();
    await comment.save();
  });

  it("saves a relation between a user and a blogPost", async () => {
    const joe = await User.findOne({ name: "Joe" }).populate("blogPosts");

    assert(joe.blogPosts[0].title === "JS is Great");
  });

  it("saves a full relation tree", async () => {
    const joe = await User.findOne({ name: "Joe" }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "comment",
        populate: {
          path: "user",
          model: "user",
        },
      },
    });

    const blogPost = joe.blogPosts[0];
    const comment = blogPost.comments[0];
    const user = comment.user;

    assert(joe.name === "Joe");
    assert(blogPost.title === "JS is Great");
    assert(comment.content === "Congrats on great post");
    assert(user.name === "Joe");
  });
});
