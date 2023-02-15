const pitySchema = require("../Schemas.js/pity");

// reset weapon fates
module.exports = (userId) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $set: {
        "FateSelection.Fates": 0,
        "FateSelection.Uprated": false,
      },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
