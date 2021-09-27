const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", async () => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "PostTitle" }],
    });

    await joe.save();

    assert(!joe.isNew);
  });

  it("can add subdocuments to an existing record", async () => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });

    await joe.save();

    joe.posts.push({ title: "New post" });

    await joe.save();

    assert(joe.posts[0].title === "New post");
  });

  it("can remove an existing subdocument", async () => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "New title" }],
    });

    await joe.save();

    joe.posts[0].remove();

    await joe.save();

    updatedJoe = await User.findOne({ name: "Joe" });

    assert(updatedJoe.posts.length === 0);
  });
});
