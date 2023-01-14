// discord.js node module
require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const CurrentBanners = require("./CurrentBanners.json");
const mongoose = require("./database/mongoose");
const genshin = require("genshin-api");

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

Client.prefix = "!";
Client.commands = new Discord.Collection();
// Creating a new client with intents and partials needed for this bot to function
// Partials make sure that we receive the full data of the object returned from events

// Ready event captures the state when the bot gets online.
Client.on("ready", (client) => {
  console.log(`This bot is now online: ${client.user.tag}`);
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  Client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    Client.once(event.name, (...args) => event.execute(...args, Client));
  } else {
    Client.on(event.name, (...args) => event.execute(...args, Client));
  }
}

mongoose.init();

Client.login(process.env.TOKEN);

// pity initialized at 1
let wishingResult = "Your results are...\n";
let cur5Pity = 1;
let cur4Pity = 1;
const SoftPity5 = 73;
const SoftPity4 = 8;

Client.on("messageCreate", (message) => {
  // only allow non-bots to perform any code execution
  if (message.author.bot) return;

  const userInput = message.content.toLowerCase().split(" ");
  const userInputText = userInput[0];
  const userInputNumber = Number(userInput[1]);

  if (userInputText === "!banners") {
    let bannersAvailable = "The current available banners are:\n";
    Object.keys(CurrentBanners).forEach(
      (banner, i) => (bannersAvailable += `${i + 1}: ${banner} \n`)
    );
    message.reply(bannersAvailable);
  }

  const wish = () => {
    const roll = Math.random();
    let dropRate5 =
      CEvent5 + Math.max(0, (cur5Pity - SoftPity5) * 10 * CEvent5);
    let dropRate4 =
      CEvent4 + Math.max(0, (cur4Pity - SoftPity4) * 10 * CEvent4);

    // have a 0.6% probability of getting the 5 star
    if (roll < dropRate5) {
      wishingResult += "||5*||\t";
      cur5Pity = 1; // reset pity
      cur4Pity++;
    }
    // probability of getting 4 star weapon (taking into account the marginal 5* drop rate)
    else if (roll < dropRate4 + dropRate5) {
      wishingResult += "||4*||\t";
      cur5Pity++;
      cur4Pity = 1; // reset pity
    } else {
      wishingResult += "||3*||\t";
      cur5Pity++;
      cur4Pity++;
    }
  };

  const displayResult = () => {
    message.reply(wishingResult);
    wishingResult = "Your results are...\n";
  };

  const wantsToWish = userInputText === "!wish" || userInputText === "!pull";
  const validNumWishes = userInputNumber === 1 || userInputNumber === 10;
  const wishing = wantsToWish && validNumWishes;

  if (wishing) {
    for (let i = 0; i < userInputNumber; i++) wish();
    displayResult();
  }

  if (userInputText === "!pity") {
    message.reply(`Your current pity is ${cur5Pity}`);
  }
});
