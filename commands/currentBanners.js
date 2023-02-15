// ===== Local Imports ===== //
const CurrentBanners = require("../GenshinData/CurrentBanners.json");

module.exports.run = (client, message, args) => {
  let bannersAvailable = "The current available banners are:\n";
  Object.keys(CurrentBanners).forEach(
    (banner, i) => (bannersAvailable += `${i + 1}: ${banner} \n`)
  );
  message.reply(bannersAvailable);
};

exports.name = "currentBanners".toLowerCase();
