const bannerSchema = require("../database/Schemas.js/banner");
const CurrentBanners = require("../CurrentBanners.json");

module.exports.run = async (client, message, args) => {
  bannerSchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const inputNum = Number(args[1]);

    // default banner selection
    if (!data) {
      bannerSchema.create({
        UserID: message.author.id,
        UserName: message.author.username,
        selectedBanner: 4,
        selectedBannerName: "Wanderlust Invocation",
      });
    }

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

    // update the entry to the selection
    bannerSchema.updateOne(
      { UserID: message.author.id },
      {
        $set: {
          selectedBanner: inputNum - 1,
          selectedBannerName: curBanner,
        },
      },
      async (err, data) => {
        if (err) throw err;
      }
    );

    message.reply(
      `You have changed your banner selection from **${prevBanner}** to **${curBanner}**`
    );
  });
};

exports.name = "setbanner";
