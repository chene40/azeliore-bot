const bannerSchema = require("../database/Schemas.js/banner");

module.exports.run = async (client, message, args) => {
  bannerSchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const username = message.author.username;
    const tag = message.author.discriminator;

    message.reply(
      `The banner currently selected for **${username}#${tag}** is **${data.selectedBannerName}**.`
    );
  });
};

exports.name = "selectedbanner";
