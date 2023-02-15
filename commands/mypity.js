const { EmbedBuilder } = require("discord.js");
const pitySchema = require("../database/Schemas.js/pity");
const toTitleCase = require("../functions/toTitleCase");
const newUserPity = require("../database/Templates.js/newUserPity");

module.exports.run = async (client, message, args) => {
  pitySchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const username = message.author.username;
    const userId = message.author.id;
    const tag = message.author.discriminator;

    if (!data) data = newUserPity(userId, userName);

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${username}#${tag}'s Pity Stats`)
      .setDescription(
        "Here are your current pity stats for the Event/Weapon/Permanent Banner..."
      )
      .addFields(
        {
          name: "Event Pity (5 ⭐)",
          value: String(data.EventBanner5),
          inline: true,
        },
        {
          name: "Event Pity (4 ⭐)",
          value: String(data.EventBanner4),
          inline: true,
        },
        {
          name: "Event Banner Uprate",
          value: toTitleCase(String(data.EventBanner4Uprate)),
          inline: true,
        }
      )
      .addFields(
        {
          name: "Weapon Pity (5 ⭐)",
          value: String(data.WeaponBanner5),
          inline: true,
        },
        {
          name: "Weapon Pity (4 ⭐)",
          value: String(data.WeaponBanner4),
          inline: true,
        },
        {
          name: "Weapon Banner Uprate",
          value: ` 5 ⭐: ${toTitleCase(
            String(data.FateSelection.Uprated)
          )} \n 4 ⭐: ${toTitleCase(String(data.WeaponBanner4Uprate))}`,
          inline: true,
        }
      )
      .addFields(
        {
          name: "Current Fate Selection",
          value: data.FateSelection.Selected
            ? toTitleCase(data.FateSelection.WeaponName.replace(/-/g, " "))
            : "None",
          inline: true,
        },
        {
          name: "Current Fate Pity",
          value: String(data.FateSelection.Fates),
          inline: true,
        }
      )
      .addFields({
        name: "Permanent Wish",
        value: String(data.Permanent5),
        inline: true,
      });
    message.channel.send({
      embeds: [embed],
    });
  });
};

exports.name = "mypity";
