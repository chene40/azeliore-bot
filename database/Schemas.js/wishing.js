const { model, Schema } = require("mongoose");

let wishingSchema = new Schema({
  UserID: String,
  UserName: String,
  wishingResult: [Object],
});

module.exports = model("wishingSchema", wishingSchema);
