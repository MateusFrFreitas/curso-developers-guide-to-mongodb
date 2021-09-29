const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });

    joe.blogPosts.push(blogPost);

    await joe.save();
    await blogPost.save();
  });

  it("users clean up dangling blogPosts on delete", async () => {
    await joe.remove();

    const numberOfBlogPosts = await BlogPost.count();

    assert(numberOfBlogPosts === 0);
  })
});
