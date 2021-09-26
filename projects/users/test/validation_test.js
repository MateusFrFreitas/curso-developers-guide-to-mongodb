const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a user name", async () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name is required.");
  });

  it("requires a user's name longer then 2 characters", async () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === "Name must be longer than 2 characters.");
  });

  it("disallows invalid record from being saved", async () => {
    const user = new User({ name: "Al" });

    try {
      await user.save();

      assert(false);
    } catch (validationResult) {     
      const { message } = validationResult.errors.name;

      assert(message === "Name must be longer than 2 characters.");
    }
  });
});
