const Genshin = require("genshin-api");
const fs = require("fs");

// ===== Retrieving all weapons ===== //
const initialFetch = () => {
	Genshin.Characters()
	.then((characters) => {
		const json = JSON.stringify(characters, null, 2);
		fs.writeFileSync("GenshinData/AllCharacterData.json", json);
		console.log("Data written to file");
	})
	.catch((err) => console.log(err));
}

initialFetch()