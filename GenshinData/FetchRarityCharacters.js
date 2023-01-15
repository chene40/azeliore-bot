const Genshin = require("genshin-api");
const fs = require("fs");
const path = require("path")
const AllCharacter = require("./AllCharacterData.json");

// ===== Creating all necessary folders ===== //
const createFolder = (path) => {
	fs.mkdirSync(path, { recursive: true }, (err, res) => {
		if (err){ console.error(err); return; }
	})
}

// ===== Retrieving all 3*, 4*, 5* characters ===== //
const fetchCharacters = (rarity) => {
	for (let charName of AllCharacter) {
		Genshin.Characters(charName)
		  	.then((char) => {
			if (char.rarity == rarity) {
				const data = JSON.stringify(char, null, 2);
				fs.writeFileSync(`GenshinData/Characters${rarity}/${charName}.json`, data)
			}
		})
	}
}

for (let i = 4; i <= 5; i++) {
	createFolder(path.join(__dirname, `Characters${i}`))
	fetchCharacters(i)
}
