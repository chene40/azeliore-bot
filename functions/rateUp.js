const CurrentBanners = require("../CurrentBanners.json");
const currentBannerKeys = Object.keys(CurrentBanners);

const event5RateUp1 = [CurrentBanners[currentBannerKeys[0]].Star5];
const event5RateUp2 = [CurrentBanners[currentBannerKeys[1]].Star5];
const event4RateUp = CurrentBanners[currentBannerKeys[0]].Star4;
const weapon5RateUp = CurrentBanners[currentBannerKeys[2]].Star5;
const weapon4RateUp = CurrentBanners[currentBannerKeys[2]].Star4;
const perm5RateUpW = CurrentBanners[currentBannerKeys[4]].Star5W;
const perm5RateUpC = CurrentBanners[currentBannerKeys[4]].Star5C;

const fs = require("fs");

const Characters4 = fs.readdirSync("./GenshinData/Characters4");
const Weapons4 = fs.readdirSync("./GenshinData/Weapons4");

const char4List = [];
const weap4List = [];

Characters4.forEach((char) => {
  char4List.push(char.substring(0, char.indexOf(".")));
});

Weapons4.forEach((weap) => {
  weap4List.push(weap.substring(0, weap.indexOf(".")));
});

for (let char of event4RateUp) {
  let index = char4List.indexOf(char);
  char4List.splice(index, 1);
}

for (let weap of weapon4RateUp) {
  let index = weap4List.indexOf(weap);
  weap4List.splice(index, 1);
}

module.exports = (selectedBanner) => {
  if (selectedBanner === 1) return [event5RateUp1, event4RateUp];
  else if (selectedBanner === 2) return [event5RateUp2, event4RateUp];
  else if (selectedBanner === 3) return [weapon5RateUp, weapon4RateUp];
  else if (selectedBanner === 5) return [perm5RateUpW, perm5RateUpC];
  else if (selectedBanner === 6) return [[], char4List];
  else if (selectedBanner === 7) return [[], weap4List];
};
