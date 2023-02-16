const pitySchema = require("../Schemas.js/pity");

module.exports = (userId, userName) => {
  pData = {
    UserID: userId,
    UserName: userName,
    EventBanner5: 1,
    EventBanner5Uprate: false,
    EventBanner4: 1,
    EventBanner4Uprate: false,
    WeaponBanner5: 1,
    FateSelection: {
      Selected: false,
      WeaponName: "",
      WeaponNum: 0,
      Fates: 0,
      Uprated: false,
    },
    WeaponBanner4: 1,
    WeaponBanner4Uprate: false,
    Permanent5: 1,
    Permanent4: 1,
  };
  pitySchema.create(pData);
  return pData;
};
