const { EmbedBuilder } = require("discord.js");

module.exports = (message, wishingResult) => {
  let sleep = async (ms) => await new Promise((r) => setTimeout(r, ms));

  const toTitleCase = (str) => {
    let words = str.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  };

  const stars = (rarity) => {
    const res = [];
    for (let i = 0; i < rarity; i++) res.push("⭐");
    return res.join("");
  };

  const getEmbed = (name, url, rarity) =>
    new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(name)
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "Character",
        iconURL:
          "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Genshin_Impact.png/revision/latest?cb=20230121174225",
        url: "https://genshin.hoyoverse.com/en/",
      })
      .setDescription("Some description here")
      .addFields(
        { name: "Rarity", value: stars(rarity) },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      })
      .setImage(url)
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

  (async () => {
    for (let i = 0; i < wishingResult.length; i++) {
      const item = wishingResult[i];
      const url = item.attachment;
      const name = toTitleCase(item.name.split(".")[0].replace("-", " "));
      const rarity = wishingResult[i].rarity;

      message.channel.send({
        embeds: [getEmbed(name, url, rarity)],
      });
      await sleep(1500);
    }
  })();

  return [];
};
