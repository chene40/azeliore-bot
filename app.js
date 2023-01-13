// discord.js node module
const Discord = require("discord.js");
const { token } = require("./config.json");
const CurrentBanners = require("./CurrentBanners.json");
// Gateway Intents were introduced by Discord so bot developers can choose which events their bot receives based on which data
// it needs to function. With partials we will be able to receive the full data of the objects returned from each event.
const {
  CEvent5,
  CEvent4,
  CEvent4W,
  CEvent4C,
  WEvent5,
  WEventPromotional,
  WEvent4,
  WEvent4W,
  WEvent4C,
  Standard5,
  Standard4,
  Standard4W,
  Standard4C,
} = require("./DropRates.json");

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

Client.login(token);

Client.on("messageCreate", (message) => {
  // only allow non-bots to perform any code execution
  if (message.author.bot) {
    return;
  }
  console.log("A new message was written");

  const userInput = message.content.toLowerCase().split(" ");
  const userInputText = userInput[0];
  const userInputNumber = Number(userInput[1]);

  // commands
  if (userInputText === "!commands" || userInputText === "!help") {
    message.reply(
      "This bot operates on the following commands: !help !commands !age !members"
    );
  }

  if (userInputText === "!age") {
    message.reply(
      `This server was created on ${new Date(
        message.guild.createdTimestamp
      )} and channel on ${new Date(message.channel.createdTimestamp)}`
    );
  }

  if (userInputText === "!members") {
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

  if (userInputText === "!banners") {
    let bannersAvailable = "The current available banners are:\n";
    Object.keys(CurrentBanners).forEach(
      (banner, i) => (bannersAvailable += `${i + 1}: ${banner} \n`)
    );
    message.reply(bannersAvailable);
  }
});
