const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });

    await joe.save();
  });

  it("model instance remove", async () => {
    await joe.remove();

    assert((await User.findOne({ name: "Joe" })) === null);
  });

  it("class method deleteOne", async () => {
    const { deletedCount } = await User.deleteOne({ name: "Joe" });

    assert(deletedCount === 1);
  });

  it("class method findOneAndRemove", async () => {
    const user = await User.findOneAndRemove({ name: "Joe" });

    assert(!(user === null));
  });

  it("class method findByIdAndRemove", async () => {
    const user = await User.findByIdAndRemove(joe._id);

    assert(!(user === null));
  });
});
