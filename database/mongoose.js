require("dotenv").config();
const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODBURL;

module.exports = {
  name: "mongoose",
  once: true,

  async execute(client) {
    if (!mongodbURL) return;

    const dbOptions = {
      useUnifiedTopology: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(mongodbURL, dbOptions);

    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("The bot has connected to the database.");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("The bot has disconnected from the database.");
    });
    mongoose.connection.on("err", () => {
      console.log(
        "There was an error with the connection to the database: " + err
      );
    });
  },
};
