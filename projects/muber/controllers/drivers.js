const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  index: async (req, res, next) => {
    try {
      const { lng, lat } = req.query;

      const drivers = await Driver.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            spherical: true,
            maxDistance: 200000,
            distanceField: "dist.calculated",
          },
        },
      ]);

      res.send(drivers);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const driverProps = req.body;

      const driver = await Driver.create(driverProps);

      res.send(driver);
    } catch (err) {
      next(err);
    }
  },

  edit: async (req, res, next) => {
    try {
      const driverId = req.params.id;
      const driverProps = req.body;

      await Driver.updateOne({ _id: driverId }, driverProps);

      const driver = await Driver.findById(driverId);

      res.send(driver);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const driverId = req.params.id;

      const driver = await Driver.findOneAndDelete({ _id: driverId });

      res.status(204).send(driver);
    } catch (err) {
      next(err);
    }
  },
};
