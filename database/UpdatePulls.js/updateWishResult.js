const wishingSchema = require("../Schemas.js/wishing");

module.exports = (userId, wishResult) =>
  wishingSchema.updateOne(
    { UserID: userId },
    { $push: { wishingResult: wishResult } },
    async (err, data) => {
      if (err) throw err;
    }
  );
