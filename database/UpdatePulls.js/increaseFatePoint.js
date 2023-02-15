const pitySchema = require("../Schemas.js/pity");

// increase weapon fate
module.exports = (userId) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $inc: { "FateSelection.Fates": 1 },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
