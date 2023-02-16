// ===== Libraries ===== //
const fs = require("fs");

const Weapons3 = fs.readdirSync("./GenshinData/Weapons3");
const Weapons4 = fs.readdirSync("./GenshinData/Weapons4");
const Weapons5 = fs.readdirSync("./GenshinData/Weapons5");

const { excludedWeapons } = require("../GenshinData");

// ===== Obtains a list of all the weapons in string representation ===== //
const weap3List = Weapons3.map((weap) => weap.substring(0, weap.indexOf(".")));

const weap4List = Weapons4.map((weap) =>
  weap.substring(0, weap.indexOf("."))
).filter((weap) => !excludedWeapons.includes(weap));

const weap5List = Weapons5.map((weap) => weap.substring(0, weap.indexOf(".")));

module.exports = (rarity, rateUp = [[], []]) => {
  if (rarity != 3 && rarity != 4 && rarity != 5)
    return console.error("Banner weapon rarity has to be either 3*, 4* or 5*!");

  let numWeapons;
  if (rarity == 3) {
    numWeapons = weap3List.length;
  } else if (rarity == 4) {
    numWeapons = rateUp[1].length ? rateUp[1].length : weap4List.length;
  } else {
    numWeapons = rateUp[0].length ? rateUp[0].length : weap4List.length;
  }

  const randN = Math.floor(Math.random() * numWeapons);

  let randWeapon;

  if (rarity == 3) {
    randWeapon = weap3List[randN];
  } else if (rarity == 4) {
    randWeapon = rateUp[1].length ? rateUp[1][randN] : weap4List[randN];
  } else {
    randWeapon = rateUp[0].length ? rateUp[0][randN] : weap5List[randN];
  }

  return `https://api.genshin.dev/weapons/${randWeapon}/icon`;
};
