const Genshin = require("genshin-api");
const fs = require("fs");

// ===== Retrieving all weapons ===== //
Genshin.Weapons()
  .then((weapons) => {
    const json = JSON.stringify(weapons, null, 2);
    fs.writeFileSync("allWeaponData.json", json);
    console.log("Data written to file");
  })
  .catch((err) => console.log(err));
