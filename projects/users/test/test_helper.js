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
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});