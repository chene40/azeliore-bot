const Genshin = require("genshin-api");
const fs = require("fs");

// ===== Retrieving all weapons ===== //
const initialFetch = () => {
	Genshin.Weapons()
	.then((weapons) => {
		const json = JSON.stringify(weapons, null, 2);
		fs.writeFileSync("GenshinData/AllWeaponData.json", json);
		console.log("Data written to file");
	})
	.catch((err) => console.log(err));
}

initialFetch()