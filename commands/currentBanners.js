// ===== Local Imports ===== //
const CurrentBanners = require("../GenshinData/CurrentBanners.json");

module.exports.run = (client, message, args) => {
  message.channel.send("The current available banners are:\n");

  Object.keys(CurrentBanners).forEach((banner, i) => {
    const image = CurrentBanners[banner].image;
    let msg = `${i + 1}: ${banner}\n`;

    setTimeout(() => {
      message.channel.send({ content: msg, files: [image] });
    }, (i + 1) * 1000);
  });
};

exports.name = "currentBanners".toLowerCase();
