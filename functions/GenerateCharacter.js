const Genshin = require("genshin-api");
const fs = require("fs");

const Characters4 = fs.readdirSync("./GenshinData/Characters4");
const Characters5 = fs.readdirSync("./GenshinData/Characters5");

const char4List = [];
const char5List = [];

// ===== Obtains a list of all the character in string representation ===== //
Characters4.forEach((char) => {
  char4List.push(char.substring(0, char.indexOf(".")));
});

Characters5.forEach((char) => {
  char5List.push(char.substring(0, char.indexOf(".")));
});

module.exports = (rarity, rateUp = [[], []]) => {
  if (rarity != 4 && rarity != 5)
    return console.error("Only a 4 star or 5 star character exists!");

  let numChars, randN, randChar;
  do {
    numChars = rarity == 4 ? char4List.length : rateUp[0].length;
    randN = Math.floor(Math.random() * numChars);
    randChar = rarity == 4 ? char4List[randN] : rateUp[0][randN];
  } while (randChar.startsWith("traveler"));

  const char = require(`../GenshinData/Characters${rarity}/${randChar}.json`);
  return char.image; // api endpoint to obtain character image
};
