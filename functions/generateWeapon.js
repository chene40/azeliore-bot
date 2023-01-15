const Genshin = require("genshin-api");
const fs = require("fs");

const Weapons3 = fs.readdirSync("./GenshinData/Weapons3");
const Weapons4 = fs.readdirSync("./GenshinData/Weapons4");
const Weapons5 = fs.readdirSync("./GenshinData/Weapons5");

const weap3 = [];
const weap4 = [];
const weap5 = [];

Weapons3.forEach((weap) => {
  weap3.push(weap.substring(0, weap.indexOf(".")));
});

Weapons4.forEach((weap) => {
  weap4.push(weap.substring(0, weap.indexOf(".")));
});

Weapons5.forEach((weap) => {
  weap5.push(weap.substring(0, weap.indexOf(".")));
});

module.exports = (rarity) => {
  if (rarity < 3 && rarity > 5)
    return console.error("Banner weapon rarity has to be either 3*, 4* or 5*!");

  if (rarity == 3) {
    n = weap3.length;
  } else if (rarity == 4) {
    n = weap4.length;
  } else {
    n = weap5.length;
  }

  const randN = Math.floor(Math.random() * n);

  let randWeap = null;
  if (rarity == 3) {
    randWeap = weap3[randN];
  } else if (rarity == 4) {
    randWeap = weap3[randN];
  } else {
    randWeap = weap3[randN];
  }

  return `https://api.genshin.dev/weapons/${randWeap}/icon`;
};
