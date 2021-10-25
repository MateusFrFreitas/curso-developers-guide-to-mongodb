const mongoose = require("mongoose");

before((done) => {
  mongoose.connect(process.env.DBURL_TEST);
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => {
      console.warn("Warning", error);
    });
});

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.createIndex({ "geometry.coordinates": "2dsphere" }))
    .then(() => done())
    .catch((err) => done());
});
