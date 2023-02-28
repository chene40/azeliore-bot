// ===== Libraries ===== //
const { EmbedBuilder } = require("discord.js");

// Local Imports
const toTitleCase = require("../functions/toTitleCase");
const pitySchema = require("../database/Schemas.js/pity");
const newUserPity = require("../database/Templates.js/newUserPity");

module.exports.run = async (client, message, args) => {
  pitySchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    const username = message.author.username;
    const userId = message.author.id;
    const tag = message.author.discriminator;

    if (!data) data = newUserPity(userId, username);

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
          name: "Event Banner Uprate (5 ⭐)",
          value: toTitleCase(String(data.EventBanner5Uprate)),
          inline: true,
        }
      )
      .addFields(
        {
          name: "Permanent Wish (5 ⭐)",
          value: String(data.Permanent5),
          inline: true,
        },
        {
          name: "Permanent Wish (4 ⭐)",
          value: String(data.Permanent4),
          inline: true,
        },
        {
          name: "Event Banner Uprate (4 ⭐)",
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
          name: "Weapon Banner Uprate (5 ⭐)",
          value: toTitleCase(String(data.FateSelection.Uprated)),
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
        },
        {
          name: "Weapon Banner Uprate (4 ⭐)",
          value: toTitleCase(String(data.WeaponBanner4Uprate)),
          inline: true,
        }
      );
    message.channel.send({
      embeds: [embed],
    });
  });
};

exports.name = "mypity";
