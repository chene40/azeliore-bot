const { EmbedBuilder } = require("@discordjs/builders");

module.exports.run = (client, message, args) => {
  const inputNumber = Number(args[1]);

  if (!message.member.permissions.has("ManageMessages"))
    return message.channel.send(
      "You do not have permission to execute this command."
    );
  if (!inputNumber)
    return message.channel.send(
      "Please specify the number of messages you want to delete."
    );
  if (inputNumber < 1 || inputNumber > 100)
    return message.channel.send("Please select a number between 1 and 100.");

  message.channel
    .bulkDelete(inputNumber)
    .then(() => {
      setTimeout(() => {
        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setDescription(
            `:white_check_mark: Delete **${inputNumber}** messages.`
          );

        message.channel.send({ embeds: [embed] });
      }, 1000 * (Math.floor(inputNumber / 20) + 1));
    })
    .catch(() => {
      message.channel.send(
        "You can only bulk delete messages that are under 14 days old."
      );
      return;
    });
};

exports.name = "purge";
