require("dotenv").config();
const mongoose = require("mongoose");

module.exports = {
  init: () => {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    mongoose.connect(
      `mongodb+srv://AzelioreBot:${process.env.PASS}@azeliorebot.kuesm86.mongodb.net/?retryWrites=true&w=majority`
    );
    mongoose.set("useFindAndModify", false);
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
