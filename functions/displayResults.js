// ===== Local Imports ===== //
const getEmbedWeapon = require("./getEmbedWeapon.js");
const getEmbedCharacter = require("./getEmbedCharacter.js");

module.exports = async (message, wishingResult) => {
  let sleep = async (ms) => await new Promise((r) => setTimeout(r, ms));

  const userName = message.author.username;
  const discriminator = message.author.discriminator;
  const discTag = `${userName}#${discriminator}`;
  const numWishes = wishingResult.length;

  (async () => {
    for (let i = 0; i < numWishes; i++) {
      const item = wishingResult[i];
      const apiData = item.apiData;
      const url = item.attachment;
      const isAChar = item.char;

      const currentWish = i + 1;

      const embed = isAChar
        ? getEmbedCharacter(apiData, currentWish, discTag, numWishes)
        : getEmbedWeapon(apiData, url, currentWish, discTag, numWishes);

      message.channel.send({
        embeds: [embed],
      });
      await sleep(1500);
    }
  })();
};
