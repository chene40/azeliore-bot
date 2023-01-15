const Genshin = require("genshin-api");
const fs = require("fs");
const path = require("path");
const AllWeapons = require("./AllWeaponData.json");

// ===== Creating all necessary folders ===== //
const createFolder = (path) => {
  fs.mkdirSync(path, { recursive: true }, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

// ===== Retrieving all 3*, 4*, 5* weapons ===== //
const fetchWeapons = (rarity) => {
  for (let weaponName of AllWeapons) {
    Genshin.Weapons(weaponName)
      .then((weapon) => {
        if (weapon.rarity == rarity) {
          const data = JSON.stringify(weapon, null, 2);
          fs.writeFileSync(
            `GenshinData/Weapons${rarity}/${weaponName}.json`,
            data
          );
        }
      })
      .catch((err) => console.log(err));
  }
};

for (let i = 3; i <= 5; i++) {
  createFolder(path.join(__dirname, `Weapons${i}`));
  fetchWeapons(i);
}
