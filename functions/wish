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

const SoftPity5 = 73;
const SoftPity4 = 8;

module.exports = (wishingResult, cur5Pity, cur4Pity) => {
  const roll = Math.random();
  let dropRate5 = CEvent5 + Math.max(0, (cur5Pity - SoftPity5) * 10 * CEvent5);
  let dropRate4 = CEvent4 + Math.max(0, (cur4Pity - SoftPity4) * 10 * CEvent4);

  // have a 0.6% probability of getting the 5 star
  if (roll < dropRate5) {
    wishingResult += "||5*||\t";
    cur5Pity = 1; // reset pity
    cur4Pity++;
  }
  // probability of getting 4 star weapon (taking into account the marginal 5* drop rate)
  else if (roll < dropRate4 + dropRate5) {
    wishingResult += "||4*||\t";
    cur5Pity++;
    cur4Pity = 1; // reset pity
  } else {
    wishingResult += "||3*||\t";
    cur5Pity++;
    cur4Pity++;
  }

  return [wishingResult, cur5Pity, cur4Pity];
};
