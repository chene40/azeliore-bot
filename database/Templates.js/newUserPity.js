const pitySchema = require("../Schemas.js/pity");

module.exports = (userId, userName) => {
  pData = {
    UserID: userId,
    UserName: userName,
    EventBanner5: 1,
    EventBanner4: 1,
    EventBanner4Uprate: false,
    WeaponBanner5: 1,
    WeaponBanner4: 1,
    WeaponBanner4Uprate: false,
    Beginner5: 1,
    Beginner4: 1,
    BeginnerAvailable: true,
    Permanent5: 1,
  };
  pitySchema.create(pData);
  return pData;
};
