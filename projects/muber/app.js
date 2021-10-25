require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

const app = express();

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.DBURL);
}

app.use(express.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
