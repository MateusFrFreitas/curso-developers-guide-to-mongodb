const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zach;

  beforeEach(async () => {
    alex = new User({ name: "Alex" });
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });

    await alex.save();
    await joe.save();
    await maria.save();
    await zach.save();
  });

  it("finds all users with a name of joe", async () => {
    const users = await User.find({ name: "Joe" });

    assert(users[0]._id.toString() === joe._id.toString());
  });

  it("find a user with a particular id", async () => {
    const user = await User.findOne({ _id: joe._id });

    assert(user.name === "Joe");
  });

  it("can skip and limit the result set", async () => {
    const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);
    assert(users.length === 2);
    assert(users[0].name === "Joe");
    assert(users[1].name === "Maria");
  });
});
