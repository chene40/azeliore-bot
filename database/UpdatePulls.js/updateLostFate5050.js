const pitySchema = require("../Schemas.js/pity");

// increase weapon fate and set uprated to false
module.exports = (userId) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $set: {
        "FateSelection.Uprated": false,
      },
      $inc: { "FateSelection.Fates": 1 },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
