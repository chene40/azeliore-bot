const CurrentBanners = require("../CurrentBanners.json");
const currentBannerKeys = Object.keys(CurrentBanners);

const event5RateUp1 = [CurrentBanners[currentBannerKeys[0]].Star5];
const event5RateUp2 = [CurrentBanners[currentBannerKeys[1]].Star5];
const event4RateUp = CurrentBanners[currentBannerKeys[0]].Star4;
const weapon5RateUp = CurrentBanners[currentBannerKeys[2]].Star5;
const weapon4RateUp = CurrentBanners[currentBannerKeys[2]].Star4;
const perm5RateUpW = CurrentBanners[currentBannerKeys[4]].Star5W;
const perm5RateUpC = CurrentBanners[currentBannerKeys[4]].Star5C;

module.exports = (selectedBanner) => {
  if (selectedBanner === 1) return [event5RateUp1, event4RateUp];
  else if (selectedBanner === 2) return [event5RateUp2, event4RateUp];
  else if (selectedBanner === 3) return [weapon5RateUp, weapon4RateUp];
  else if (selectedBanner === 5) return [perm5RateUpW, perm5RateUpC];
};
