// ===== Libraries ===== //
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

const GenChar = (rarity, rateUp = [[], []]) => {
  if (rarity != 4 && rarity != 5)
    return console.error("Only a 4 star or 5 star character exists!");

  let numChars, randN, randChar;
  do {
    // rateUp[0] -> 5 star
    // rateUp[1] -> 4 star
    numChars = rateUp[0].length ? rateUp[0].length : rateUp[1].length;
    randN = Math.floor(Math.random() * numChars);
    randChar = rateUp[0].length ? rateUp[0][randN] : rateUp[1][randN];
  } while (randChar.startsWith("traveler"));

  const char = require(`../GenshinData/Characters${rarity}/${randChar}.json`);
  return char.image; // api endpoint to obtain character image
};

module.exports = { char4List, char5List, GenChar };
