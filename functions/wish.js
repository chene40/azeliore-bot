const {
  CEvent5,
  CEvent4,
  CEvent4W,
  CEvent4C,
  WEvent5,
  WEventPromotional,
  WEvent4,
  WEvent4W,
  WEvent4C,
  Standard5,
  Standard4,
  Standard4W,
  Standard4C,
} = require("../DropRates.json");

const GenChar = require("./GenerateCharacter");
const GenWeapon = require("./GenerateWeapon");

const SoftPity5 = 73;
const SoftPity4 = 8;

const pullResult = (data, rarity, char) => {
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

module.exports = (wishingResult, cur5Pity, cur4Pity) => {
  const roll = Math.random();
  let dropRate5 = CEvent5 + Math.max(0, (cur5Pity - SoftPity5) * 10 * CEvent5);
  let dropRate4 = CEvent4 + Math.max(0, (cur4Pity - SoftPity4) * 10 * CEvent4);

  // have a 0.6% probability of getting the 5 star
  if (roll < dropRate5) {
    wishingResult.push(pullResult(GenChar(5), 5, (char = true)));
    cur5Pity = 1; // reset pity
    cur4Pity++;
  }
  // probability of getting 4 star weapon (taking into account the marginal 5* drop rate)
  else if (roll < dropRate4 + dropRate5) {
    const getChar = Math.round(Math.random());

    const res = pullResult(
      getChar ? GenChar(4) : GenWeapon(4),
      4,
      (char = getChar ? true : false)
    );

    wishingResult.push(res);
    cur5Pity++;
    cur4Pity = 1; // reset pity
  } else {
    wishingResult.push(pullResult(GenWeapon(3), 3, (char = false)));
    cur5Pity++;
    cur4Pity++;
  }

  return [wishingResult, cur5Pity, cur4Pity];
};
