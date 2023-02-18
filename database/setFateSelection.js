const pitySchema = require("./Schemas.js/pity");

// set the fate to the user inputted choice
module.exports = (userId, curFate, weaponNum) =>
  pitySchema.updateOne(
    { UserID: userId },
      {
        $set: {
          FateSelection: {
            Selected: true,
            WeaponName: curFate,
            WeaponNum: weaponNum,
            Fates: 0,
            Uprated: false,
          },
        },
      },
      async (err, data) => {
        if (err) throw err;
      }
  );
