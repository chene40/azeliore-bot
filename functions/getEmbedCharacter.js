// ===== Libraries ===== //
const { EmbedBuilder } = require("discord.js");

// ===== Local Imports ===== //
const stars = require("./stars.js");

const iconUrlTop =
  "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Genshin_Impact.png/revision/latest?cb=20230121174225";
const iconUrlBottom =
  "https://storage.qoo-img.com/cimg/note/2022/07/22/d47df35a00787be61db3c39f00189fdf.jpg";

module.exports = (
  {
    name,
    title,
    vision,
    weapon,
    nation,
    affiliation,
    rarity,
    constellation,
    birthday,
    description,
    image,
  },
  currentWish,
  discTag,
  numWishes
) => {
  return new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(name)
    .setURL(`https://genshin-impact.fandom.com/wiki/${name.replace(/ /g, "_")}`)
    .setAuthor({
      name: "Character",
      iconURL: iconUrlTop,
      url: "https://genshin.hoyoverse.com/en/",
    })
    .setDescription(description)
    .addFields({
      name: `Wish #${currentWish} of ${numWishes} for ${discTag}`,
      value: " ",
    })
    .addFields(
      { name: "Title", value: title ? title : "None", inline: true },
      { name: "Rarity", value: stars(rarity), inline: true },
      { name: "Vision", value: vision, inline: true }
    )

    .addFields(
      { name: "Weapon", value: weapon, inline: true },
      {
        name: "Constellation",
        value: constellation,
        inline: true,
      },
      {
        name: "Birthday",
        value: birthday.split("0000-")[1],
        inline: true,
      }
    )
    .addFields(
      { name: "Nation", value: nation, inline: true },
      { name: "Affiliation", value: affiliation, inline: true }
    )
    .setImage(image)
    .setTimestamp()
    .setFooter({
      text: "Yae is manifesting you a 5-star on your next roll! ٩(^ᴗ^)۶",
      iconURL: iconUrlBottom,
    });
};
