const pitySchema = require("../Schemas.js/pity");

// increment 4-star and 5-star pity
module.exports = (userId, banner5Name, banner4Name) =>
  pitySchema.updateOne(
    { UserID: userId },
    {
      $inc: { [banner5Name]: 1, [banner4Name]: 1 },
    },
    async (err, data) => {
      if (err) throw err;
    }
  );
