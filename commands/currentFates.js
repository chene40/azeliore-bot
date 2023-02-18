// ===== Local Imports ===== //
const CurrentBanners = require("../GenshinData/CurrentBanners.json");

module.exports.run = (client, message, args) => {
  let fatesAvailable = "The current available fate paths are:\n";

  const banners = Object.keys(CurrentBanners);
  const weaponBanner = CurrentBanners[banners[2]];

  weaponBanner.Star5.forEach((weapon, i) => {
    fatesAvailable += `${i + 1}: ${weapon} \n`;
  });
  message.reply(fatesAvailable);
};

exports.name = "currentFates".toLowerCase();
