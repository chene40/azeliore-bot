const { EmbedBuilder } = require("discord.js");
const stars = require("./stars.js");
const toTitleCase = require("./toTitleCase.js");

const iconUrlTop =
  "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Genshin_Impact.png/revision/latest?cb=20230121174225";
const iconUrlBottom =
  "https://storage.qoo-img.com/cimg/note/2022/07/22/d47df35a00787be61db3c39f00189fdf.jpg";

module.exports = (
  {
    name,
    type,
    rarity,
    baseAttack,
    subStat,
    passiveName,
    passiveDesc,
    ascensionMaterial,
  },
  url
) => {
  console.log(
    `https://genshin-impact.fandom.com/wiki/${name.replace(/ /g, "_")}`
  );
  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(name)
    .setURL(`https://genshin-impact.fandom.com/wiki/${name.replace(/ /g, "_")}`)
    .setAuthor({
      name: "Weapon",
      iconURL: iconUrlTop,
      url: "https://genshin.hoyoverse.com/en/",
    })
    .addFields(
      { name: "Weapon Type", value: type, inline: true },
      { name: "Rarity", value: stars(rarity), inline: true },
      {
        name: "Ascension Material",
        value: ascensionMaterial ? toTitleCase(ascensionMaterial) : "None",
        inline: true,
      }
    )
    .addFields(
      { name: "Base Attack", value: String(baseAttack), inline: true },
      { name: "Sub-Stat", value: subStat, inline: true },
      { name: "Passive Name", value: passiveName, inline: true }
    )
    .addFields({
      name: "Passive Description",
      value: passiveDesc,
    })
    .setImage(url)
    .setTimestamp()
    .setFooter({
      text: "Yae is manifesting that you get a 5-star on your next roll! ٩(^ᴗ^)۶",
      iconURL: iconUrlBottom,
    });
};
