// ===== Local Imports ===== //
const wish = require("../functions/performWish");
const displayResult = require("../functions/displayResults");
const wishingSchema = require("../database/Schemas.js/wishing");
const newUserWishing = require("../database/Templates.js/newUserWishing");

module.exports.run = (client, message, args) => {
  const numWishes = Number(args[1]);
  const validNumWishes = numWishes === 1 || numWishes === 10;

  if (validNumWishes) {
    const userName = message.author.username;
    const userId = message.author.id;

    wishingSchema.findOne({ UserID: userId }, async (err, data) => {
      if (err) throw err;

      if (!data) data = newUserWishing(userId, userName);

      (async () => {
        for (let i = 0; i < numWishes; i++) {
          await wish(userId, userName, i);
        }
      })();

      setTimeout(() => {
        wishingSchema.findOne({ UserID: userId }, async (err, data) => {
          if (err) throw err;

          let wishResult = data.wishingResult;

          displayResult(message, wishResult);
          wishingSchema.updateOne(
            { UserID: userId },
            {
              $set: {
                wishingResult: [],
              },
            },
            async (err, data) => {
              if (err) throw err;
            }
          );
        });
      }, 1000);
    });
  }
};

exports.name = "wish";
