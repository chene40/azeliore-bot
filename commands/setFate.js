const pitySchema = require("../database/Schemas.js/pity");
const newUserPity = require("../database/Templates.js/newUserPity");
const CurrentBanners = require("../CurrentBanners.json");

module.exports.run = async (client, message, args) => {
  pitySchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const inputNum = Number(args[1]);

    // default banner selection
    if (!data) data = newUserPity(message.author.id, message.author.username);

    const banners = Object.keys(CurrentBanners);

    const weaponBanner = CurrentBanners[banners[2]];

    const invalidInput = inputNum > weaponBanner.length || inputNum < 1;

    if (!inputNum || invalidInput) {
      const currentSelectableBanners = `Use the command: *!currentfates* to find a list of available fates`;
      const displayMessage = `To select a fate, use the command: *!setfate <number>*\n ${currentSelectableBanners}`;
      message.reply(displayMessage);
      return;
    }

    const prevFate = data.FateSelection.WeaponName;
    const curFate = weaponBanner.Star5[inputNum - 1];

    // update the entry to the selection
    pitySchema.updateOne(
      { UserID: message.author.id },
      {
        $set: {
          FateSelection: {
            Selected: true,
            WeaponName: curFate,
            WeaponNum: inputNum,
            Fates: 0,
            Uprated: false,
          },
        },
      },
      async (err, data) => {
        if (err) throw err;
      }
    );

    message.reply(
      prevFate
        ? `You have changed your fate selection from **${prevFate}** to **${curFate}**`
        : `You have updated your fate selection to **${curFate}**`
    );
  });
};

exports.name = "setfate";
