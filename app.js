// discord.js node module
const Discord = require("discord.js");

// Contains the string representing the password/token for the discord bot.
const { token } = require("./config.json");
// Gateway Intents were introduced by Discord so bot developers can choose which events their bot receives based on which data
// it needs to function. With partials we will be able to receive the full data of the objects returned from each event.

const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.Guilds,
  ],
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.User,
    Discord.Partials.GuildScheduledEvent,
  ],
});

// Creating a new client with intents and partials needed for this bot to function
// Partials make sure that we receive the full data of the object returned from events

// Ready event captures the state when the bot gets online.
Client.on("ready", (client) => {
  console.log(`This bot is now online: ${client.user.tag}`);
});

// Logs in the discord bot with the password stored in an external file
Client.login(token);

Client.on("messageCreate", (message) => {
  // only allow non-bots to perform any code execution
  if (message.author.bot) {
    return;
  }
  console.log("A new message was written");

  const userText = message.content.toLowerCase();

  // only runs this code if the user that wrote the message is not a bot.
  const user = message.author;
  if (!message.author.bot) {
    message.reply(`Hello ${user.username}.`);
  }

  // commands
  if (userText === "!commands" || userText === "!help") {
    message.reply(
      "This bot operates on the following commands: !help !commands !age !members"
    );
  }

  if (userText === "!age") {
    message.reply(
      `This server was created on ${new Date(
        message.guild.createdTimestamp
      )} and channel on ${new Date(message.channel.createdTimestamp)}`
    );
  }

  if (userText === "!members") {
    message.guild.members.fetch().then(
      (value) => {
        value.forEach((user) => {
          message.reply(
            `${user.user.username} has joined this server on ${new Date(
              user.joinedTimestamp
            )}`
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

});
