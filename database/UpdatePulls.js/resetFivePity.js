const pitySchema = require("../Schemas.js/pity");

// reset 5-star pity to 1 and increase 4-star pity
module.exports = (userId, banner5Name, banner4Name) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $set: { [banner5Name]: 1 },
      $inc: { [banner4Name]: 1 },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
