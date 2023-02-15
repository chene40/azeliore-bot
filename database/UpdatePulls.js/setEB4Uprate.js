const pitySchema = require("../Schemas.js/pity");

// set the event banner 4 uprate
module.exports = (userId, upratedNext) =>
  pitySchema.updateOne(
    { UserID: userId },
    { $set: { EventBanner4Uprate: upratedNext } },
    async (err, data) => {
      if (err) throw err;
    }
  );
