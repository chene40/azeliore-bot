// ===== Libraries/API Imports ===== //
require("dotenv").config();
const fs = require("fs");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const mongoose = require("./database/mongoose");
const Genshin = require("genshin-api");

// ===== Local Imports ===== //
const wish = require("./functions/wish");
const displayResult = require("./functions/displayResult");

// ===== Declaring Bot GatewayIntentBits and Partials ===== //
// Creating a new client with intents and partials needed for this bot to function
// Partials make sure that we receive the full data of the object returned from events
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.User,
    Partials.GuildScheduledEvent,
  ],
});

// ===== Setting up Bot Configs ===== //
client.prefix = "!"; // Messages starting with the prefix will be handled as a command
client.commands = new Collection(); // Commands are to be stored in a hash

// ===== Authenticates Bot Login ===== //
client.on("ready", (client) => {
  console.log(`This bot is now online: ${client.user.tag}`);
});
client.login(process.env.TOKEN);

// ===== Retrieves all command and event files from the project ===== //
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// ===== Initializes MongoDB ===== //
mongoose.init();


// ===== Declaring and Initializing Global Variables ===== //
// Will need to configure so every user have their own data within DB
// Pity initialized at 1
let wishingResult = "Your results are...\n";
let cur5Pity = 1;
let cur4Pity = 1;

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // only allow non-bots to perform any code execution

  const userInput = message.content.toLowerCase().split(" ");
  const userInputText = userInput[0];
  const userInputNumber = Number(userInput[1]);

  if (userInputText === "!pity") {
    return message.reply(`Your current pity is ${cur5Pity}`);
  }

  const wantsToWish = userInputText === "!wish" || userInputText === "!pull";
  const validNumWishes = userInputNumber === 1 || userInputNumber === 10;
  const wishing = wantsToWish && validNumWishes;

  if (wishing) {
    for (let i = 0; i < userInputNumber; i++) {
      result = wish(wishingResult, cur5Pity, cur4Pity);
      wishingResult = result[0];
      cur5Pity = result[1];
      cur4Pity = result[2];
    }
    displayResult(message, wishingResult);
    return;
  }

  if (userInputText.startsWith(client.prefix)) {
    const args = message.content
      .slice(client.prefix.length) // start from the prefix to the end of the string
      .trim() // reduce and trailing or leading white spaces
      .split(/ +/g); // globally splits the string by spaces
    const commandName = userInputText.split(client.prefix)[1];
    const command = client.commands.get(commandName);
    if (!command)
      return message.channel.send(
        `There does not exist a command within this bot called ${commandName}.`
      );
    command.run(client, message, args);
  }
});
