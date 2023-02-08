const { EmbedBuilder } = require("discord.js");
const pitySchema = require("../database/Schemas.js/pity");
const toTitleCase = require("../functions/toTitleCase");

module.exports.run = async (client, message, args) => {
  pitySchema.findOne({ UserID: message.author.id }, async (err, data) => {
    if (err) throw err;

    if (!data) {
      data = {
        UserID: message.author.id,
        UserName: message.author.username,
        EventBanner5: 1,
        EventBanner4: 1,
        EventBanner4Uprate: false,
        WeaponBanner5: 1,
        WeaponBanner4: 1,
        WeaponBanner4Uprate: false,
        Beginner5: 1,
        Beginner4: 1,
        BeginnerAvailable: true,
        Permanent5: 1,
      };
      pitySchema.create(data);
    }

    const tag = message.author.discriminator;
    const username = message.author.username;

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
          name: "Weapon Banner Uprate",
          value: toTitleCase(String(data.WeaponBanner4Uprate)),
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
