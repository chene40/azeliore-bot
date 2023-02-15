const pitySchema = require("../Schemas.js/pity");

// set guaranteed weapon fate
module.exports = (userId) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $set: { "FateSelection.Uprated": true },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
