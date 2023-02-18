// ===== Local Imports ===== //
const pitySchema = require("../database/Schemas.js/pity");
const newUserPity = require("../database/Templates.js/newUserPity");
const toTitleCase = require("../functions/toTitleCase");

module.exports.run = async (client, message, args) => {
  pitySchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const username = message.author.username;
    const userId = message.author.id;
    const tag = message.author.discriminator;

    if (!data) data = newUserPity(userId, username);

    message.reply(
      data.FateSelection.WeaponName
        ? `The fate currently selected for **${username}#${tag}** is **${toTitleCase(
            data.FateSelection.WeaponName.replace(/-/g, " ")
          )}**.`
        : `**${username}#${tag}** has not selected a fate path yet.`
    );
  });
};

exports.name = "selectedfate";
