const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });

    await joe.save();
  });

  it("instance type using set n save", async () => {
    joe.name = "Alex";

    await joe.save();

    assert(!joe.isModified());
  });

  it("a model class can update many records", async () => {
    const { modifiedCount } = await User.updateMany(
      { name: "Joe" },
      { name: "Alex" }
    );

    assert(modifiedCount);
  });

  it("a model class can update one record", async () => {
    const { modifiedCount } = await User.updateOne(
      { name: "Joe" },
      { name: "Alex" }
    );

    assert(modifiedCount);
  });

  it("a model class can find a record and update", async () => {
    const user = await User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" });

    assert(!(user === null));
  });

  it("a model class can find a record with an id and update", async () => {
    const user = await User.findByIdAndUpdate(joe._id, { name: "Alex" });

    assert(!(user === null));
  });
});
