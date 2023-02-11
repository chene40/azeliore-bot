module.exports = (data, rarity, char) => {
  const name = data.split("/")[4];

  const path = `../GenshinData/${
    char ? "Characters" : "Weapons"
  }${rarity}/${name}.json`;

  const file = require(path);

  return {
    apiData: file,
    attachment: data,
    description: `${name}'s splash art.`,
    rarity: rarity,
    char: char,
  };
};
