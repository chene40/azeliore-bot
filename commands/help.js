// ===== Libraries ===== //
const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args) => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`Azeliore Bot`)
    .setDescription(
      `Here is a list of available commands that you can execute. In order to run a command, prefix your message with the character '!'.`
    )
    .addFields(
      {
        name: "!currentbanners",
        value: `Displays a list of all available banners that the user can select and wish on.`,
        inline: true,
      },
      {
        name: "!selectedbanner",
        value: `Shows the currently selected banner. This banner will accumulate pity if the user is attempting to make a wish on it.`,
        inline: true,
      },
      {
        name: "!setbanner <number>",
        value: `Update the user's current banner to one of the banners available for wishing. \nThe input <number> can be any of the following numbers: {1,2,3,4}, which correspond to the banner list on the !currentbanners list.`,
      }
    )
    .addFields(
      {
        name: "!currentfates",
        value: `Displays a list of all available fates that the user can select and wish towards.`,
        inline: true,
      },
      {
        name: "!selectedfate",
        value: `Shows the currently selected fate. This fate will accumulate pity if the user is attempting to make a wish on it.`,
        inline: true,
      },
      {
        name: "!setfate <number>",
        value: `Update the user's current fate to one of the fates available for wishing. \nThe input <number> can be any of the following numbers: {1,2}, which correspond to the fate list on the !currentfates list.`,
      }
    )
    .addFields(
      {
        name: "!mypity",
        value: `Shows all the current pity data for each banner pertaining to the user.`,
        inline: true,
      },
      {
        name: "!wish <number>",
        value: `Makes <number> of wishes on the currently selected banner. Wishes can only be made in increments of '1' or '10'.`,
        inline: true,
      }
    )
    .addFields({
      name: "Additional utility commands.",
      value: `These commands are all purpose commands to help perform general tasks and are not specific to the Genshin Gacha environment.`,
    })
    .addFields(
      {
        name: "!purge <amount>",
        value: `Purge away the top <amount> most recent messages where amount is the number messages that you want to delete. \nNote: You can only bulk delete messages to an upward of 100 at a time and only those that are less than 14 days old.`,
      },
      {
        name: "!reload <command>",
        value: `Reload any of the commands if you experience a problem with the command. <command> is any of the other commands listed above (e.g. !reload wish).`,
      }
    );
  message.channel.send({
    embeds: [embed],
  });
};

exports.name = "help";
