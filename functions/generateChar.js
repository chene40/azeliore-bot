const Genshin = require("genshin-api");
const fs = require("fs");

const Characters4 = fs.readdirSync("./GenshinData/Characters4");
const Characters5 = fs.readdirSync("./GenshinData/Characters5");

const chars4 = [];
const chars5 = [];

Characters4.forEach((char) => {
  chars4.push(char.substring(0, char.indexOf(".")));
});

Characters5.forEach((char) => {
  chars5.push(char.substring(0, char.indexOf(".")));
});

module.exports = (rarity) => {
  if (rarity != 4 && rarity != 5)
    return console.error("Only a 4 star or 5 star character exists!");
  const n = rarity == 4 ? chars4.length : chars5.length;
  const randN = Math.floor(Math.random() * n);
  const randChar = rarity == 4 ? chars4[randN] : chars5[randN];
  const char = require(`../GenshinData/Characters${rarity}/${randChar}.json`);
  return char.image;
};
