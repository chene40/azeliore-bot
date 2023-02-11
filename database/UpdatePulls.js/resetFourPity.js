const pitySchema = require("../Schemas.js/pity");

// reset 4-star pity to 1 and increase 5-star pity
module.exports = (userId, banner5Name, banner4Name) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $set: { [banner4Name]: 1 },
      $inc: { [banner5Name]: 1 },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
