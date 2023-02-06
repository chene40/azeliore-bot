const { model, Schema } = require("mongoose");

let pitySchema = new Schema({
  UserID: String,
  UserName: String,
  EventBanner5: Number,
  EventBanner4: Number,
  EventBanner4Uprate: Boolean, // if next 4-star pull have to be promotional character
  WeaponBanner5: Number,
  WeaponBanner4: Number,
  WeaponBanner4Uprate: Boolean, // if next 4-star pull have to be promotional weapon
  Beginner5: Number,
  Beginner4: Number,
  BeginnerAvailable: Boolean, // if player can still wish on this banner
  Permanent5: Number,
});

module.exports = model("pitySchema", pitySchema);
