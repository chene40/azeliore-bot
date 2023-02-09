// ===== Local Imports ===== //
const wish = require("../functions/Wish");
const displayResult = require("../functions/DisplayResults");
const wishingSchema = require("../database/Schemas.js/wishing");

module.exports.run = (client, message, args) => {
  const numWishes = Number(args[1]);
  const validNumWishes = numWishes === 1 || numWishes === 10;

  if (validNumWishes) {
    wishingSchema.findOne({ UserID: message.author.id }, async (err, data) => {
      if (err) throw err;

      if (!data) {
        data = {
          UserID: message.author.id,
          UserName: message.author.username,
          wishingResult: [],
        };
        wishingSchema.create(data);
      }

      for (let i = 0; i < numWishes; i++) {
        wish(message.author.id, message.author.username);
      }

      setTimeout(() => {
        wishingSchema.findOne(
          { UserID: message.author.id },
          async (err, data) => {
            if (err) throw err;

            let wishResult = data.wishingResult;

            displayResult(message, wishResult);
            wishingSchema.updateOne(
              { UserID: message.author.id },
              {
                $set: {
                  wishingResult: [],
                },
              },
              async (err, data) => {
                if (err) throw err;
              }
            );
          }
        );
      }, 1000);
    });
  }
};

exports.name = "wish";
