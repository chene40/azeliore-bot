const Genshin = require("genshin-api");
const fs = require("fs");
const allWeapons = require("./allWeaponData.json");

// ===== Retrieving all 3* weapons ===== //

let weapons3 = [];

for (let weaponName of allWeapons) {
  Genshin.Weapons(weaponName)
    .then((weapon) => {
      if (weapon.rarity == 3) {
        weapons3.push(weapon);
        fs.writeFileSync("Weapon3Star.json", json);
      }
    })
    .catch((error) => console.log(error));
}

const data = JSON.stringify(weapons3, null, 2);
fs.writeFileSync("Weapon3Star.json", data);
