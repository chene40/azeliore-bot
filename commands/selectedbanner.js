// ===== Local Imports ===== //
const bannerSchema = require("../database/Schemas.js/banner");
const newUserBanner = require("../database/Templates.js/newUserBanner");

module.exports.run = async (client, message, args) => {
  bannerSchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    if (!data) data = newUserBanner(message.author.id, message.author.username);

    const username = message.author.username;
    const tag = message.author.discriminator;

    message.reply(
      `The banner currently selected for **${username}#${tag}** is **${data.selectedBannerName}**.`
    );
  });
};

exports.name = "selectedbanner";
