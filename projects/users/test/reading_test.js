const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });

    await joe.save();
  });

  it("finds all users with a name of joe", async () => {
    const users = await User.find({ name: "Joe" });

    assert(users[0]._id.toString() === joe._id.toString());
  });

  it("find a user with a particular id", async () => {
    const user = await User.findOne({ _id: joe._id });

    assert(user.name === "Joe");
  });
});
