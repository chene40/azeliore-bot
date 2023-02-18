// ===== Local Imports ===== //
const bannerSchema = require("../database/Schemas.js/banner");
const newUserBanner = require("../database/Templates.js/newUserBanner");
const CurrentBanners = require("../GenshinData/CurrentBanners.json");

const setBannerSelection = require("../database/setBannerSelection")

module.exports.run = async (client, message, args) => {
  bannerSchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const inputNum = Number(args[1]);

    // default banner selection
    if (!data) data = newUserBanner(message.author.id, message.author.username);

    const banners = Object.keys(CurrentBanners);
    const invalidInput = inputNum > banners.length || inputNum < 1;

    if (!inputNum || invalidInput) {
      const currentSelectableBanners = `Use the command: *!currentbanners* to find a list of available banners`;
      const displayMessage = `To select a banner to wish on, use the command: *!setbanner <number>*\n ${currentSelectableBanners}`;
      message.reply(displayMessage);
      return;
    }

    const prevBanner = data.selectedBannerName;
    const curBanner = banners[inputNum - 1];
	const userId = message.author.id

    // update the entry to the selection
	setBannerSelection(userId, inputNum, curBanner)

    message.reply(
      `You have changed your banner selection from **${prevBanner}** to **${curBanner}**`
    );
  });
};

exports.name = "setbanner";
