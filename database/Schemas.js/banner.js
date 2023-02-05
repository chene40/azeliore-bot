const { model, Schema } = require("mongoose");

let bannerSchema = new Schema({
  UserID: String,
  UserName: String,
  selectedBanner: Number,
  selectedBannerName: String,
});

module.exports = model("bannerSchema", bannerSchema);
