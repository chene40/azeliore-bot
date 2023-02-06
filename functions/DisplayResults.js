const getEmbedWeapon = require("./getEmbedWeapon.js");
const getEmbedCharacter = require("./getEmbedCharacter.js");

module.exports = async (message, wishingResult) => {
  let sleep = async (ms) => await new Promise((r) => setTimeout(r, ms));

  (async () => {
    for (let i = 0; i < wishingResult.length; i++) {
      const item = wishingResult[i];
      const apiData = item.apiData;
      const url = item.attachment;
      const isAChar = item.char;

      const embed = isAChar
        ? getEmbedCharacter(apiData)
        : getEmbedWeapon(apiData, url);

      message.channel.send({
        embeds: [embed],
      });
      await sleep(1500);
    }
  })();
};
