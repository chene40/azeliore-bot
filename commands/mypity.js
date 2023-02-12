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
        "Here are your current pity stats for the Event, Weapon, and the Permanent Banner..."
      )
      .addFields(
        {
          name: "Event ⭐⭐⭐⭐⭐",
          value: String(data.EventBanner5),
          inline: true,
        },
        {
          name: "Event ⭐⭐⭐⭐",
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
          name: "Weapon ⭐⭐⭐⭐⭐",
          value: String(data.WeaponBanner5),
          inline: true,
        },
        {
          name: "Weapon ⭐⭐⭐⭐",
          value: String(data.WeaponBanner4),
          inline: true,
        },
        {
          name: "Weapon Banner Uprate (4⭐)",
          value: toTitleCase(String(data.WeaponBanner4Uprate)),
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
          name: "Weapon Banner Uprate (5⭐)",
          value: toTitleCase(String(data.FateSelection.Uprated)),
          inline: true,
        }
      )
      .addFields(
        {
          name: "Permanent Wish",
          value: String(data.Permanent5),
          inline: true,
        },
        {
          name: "Beginner Wish Available",
          value: toTitleCase(String(data.BeginnerAvailable)),
          inline: true,
        },
        {
          name: "Beginner's Wish",
          value: data.BeginnerAvailable
            ? toTitleCase(String(data.BeginnerAvailable))
            : "N/A",
          inline: true,
        }
      );
    message.channel.send({
      embeds: [embed],
    });
  });
};

exports.name = "mypity";
