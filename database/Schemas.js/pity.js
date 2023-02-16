const { model, Schema } = require("mongoose");

let pitySchema = new Schema({
  UserID: String,
  UserName: String,
  EventBanner5: Number,
  EventBanner5Uprate: Boolean, // if next 5-star pull is guaranteed to be promotional character
  EventBanner4: Number,
  EventBanner4Uprate: Boolean, // if next 4-star pull is guaranteed to be promotional character
  WeaponBanner5: Number,
  WeaponBanner5Fates: Number, // number of fate points accumulated
  FateSelection: {
    Selected: Boolean,
    WeaponName: String,
    WeaponNum: Number,
    Fates: Number,
    Uprated: Boolean,
  },
  WeaponBanner4: Number,
  WeaponBanner4Uprate: Boolean, // if next 4-star pull is guaranteed to be promotional weapon
  Permanent5: Number,
  Permanent4: Number,
});

module.exports = model("pitySchema", pitySchema);
