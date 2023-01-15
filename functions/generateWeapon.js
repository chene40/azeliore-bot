const Genshin = require("genshin-api");
const fs = require("fs");

const Weapons3 = fs.readdirSync("./GenshinData/Weapons3");
const Weapons4 = fs.readdirSync("./GenshinData/Weapons4");
const Weapons5 = fs.readdirSync("./GenshinData/Weapons5");

const weap3List = [];
const weap4List = [];
const weap5List = [];

// ===== Obtains a list of all the weapons in string representation ===== //
Weapons3.forEach((weap) => {
  weap3List.push(weap.substring(0, weap.indexOf(".")));
});

Weapons4.forEach((weap) => {
  weap4List.push(weap.substring(0, weap.indexOf(".")));
});

Weapons5.forEach((weap) => {
  weap5List.push(weap.substring(0, weap.indexOf(".")));
});

module.exports = (rarity) => {
  if (rarity != 3 && rarity != 4 && rarity != 5)
    return console.error("Banner weapon rarity has to be either 3*, 4* or 5*!");

  let numWeapons;
  if (rarity == 3) {
    numWeapons = weap3List.length;
  } else if (rarity == 4) {
    numWeapons = weap4List.length;
  } else {
    numWeapons = weap5List.length;
  }

  const randN = Math.floor(Math.random() * numWeapons);

  let randWeapon;

  if (rarity == 3) {
    randWeapon = weap3List[randN];
  } else if (rarity == 4) {
    randWeapon = weap4List[randN];
  } else {
    randWeapon = weap5List[randN];
  }

  return `https://api.genshin.dev/weapons/${randWeapon}/icon`;
};
