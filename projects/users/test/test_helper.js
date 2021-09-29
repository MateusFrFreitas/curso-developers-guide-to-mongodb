require("dotenv").config();
const mongoose = require("mongoose");

before((done) => {
  mongoose.connect(process.env.DBURL);
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => console.warn("Warning", error));
});

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop();
      done();
    });
  });
});
