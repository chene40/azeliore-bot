const pitySchema = require("../Schemas.js/pity");

// set the event banner 4 uprate
module.exports = (userId, upratedNext) =>
  pitySchema.updateOne(
    { UserID: userId },
    { $set: { WeaponBanner4Uprate: upratedNext } },
    async (err, data) => {
      if (err) throw err;
    }
  );
