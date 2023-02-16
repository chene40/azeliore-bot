// ===== Libraries ===== //
const fs = require("fs");

// ===== Local Imports ===== //
const CurrentBanners = require("../GenshinData/CurrentBanners.json");

const currentBannerKeys = Object.keys(CurrentBanners);
const event5RateUp1 = [CurrentBanners[currentBannerKeys[0]].Star5];
const event5RateUp2 = [CurrentBanners[currentBannerKeys[1]].Star5];
const event4RateUp = CurrentBanners[currentBannerKeys[0]].Star4;
const weapon5RateUp = CurrentBanners[currentBannerKeys[2]].Star5;
const weapon4RateUp = CurrentBanners[currentBannerKeys[2]].Star4;
const perm5RateUpW = CurrentBanners[currentBannerKeys[3]].Star5W;
const perm5RateUpC = CurrentBanners[currentBannerKeys[3]].Star5C;

const { char4List } = require("./generateCharacter");
const { weap4List } = require("./generateWeapon");

// make a copy of the array since we will be modifying it
const allChar4ExcludingRateUp = char4List.slice();
const allWeapon4ExcludingRateUp = weap4List.slice();

// remove the rate up character from the pool of 4 stars
for (let char of event4RateUp) {
  let index = allChar4ExcludingRateUp.indexOf(char);
  allChar4ExcludingRateUp.splice(index, 1);
}

// remove the rate up weapon from the pool of 4 stars
for (let weap of weapon4RateUp) {
  let index = allWeapon4ExcludingRateUp.indexOf(weap);
  allWeapon4ExcludingRateUp.splice(index, 1);
}

module.exports = (selectedBanner) => {
  if (selectedBanner === 1) return [event5RateUp1, event4RateUp];
  else if (selectedBanner === 2) return [event5RateUp2, event4RateUp];
  else if (selectedBanner === 3) return [weapon5RateUp, weapon4RateUp];
  else if (selectedBanner === 4) return [perm5RateUpW, perm5RateUpC];
  else if (selectedBanner === 5) return [[], allChar4ExcludingRateUp];
  else if (selectedBanner === 6) return [[], allWeapon4ExcludingRateUp];
};
