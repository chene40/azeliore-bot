// Database Schemas
const pitySchema = require("../database/Schemas.js/pity");
const bannerSchema = require("../database/Schemas.js/banner");

// Database Document Creation
const newPityUser = require("../database/Templates.js/newUserPity");

// Database Updates
const updateWishResult = require("../database/UpdatePulls.js/updateWishResult");
const updateBothPity = require("../database/UpdatePulls.js/updateBothPity");
const resetFourPity = require("../database/UpdatePulls.js/resetFourPity");
const resetFivePity = require("../database/UpdatePulls.js/resetFivePity");

// Helper Functions
const GenChar = require("./generateCharacter");
const GenWeapon = require("./generateWeapon");
const getPityAndBannerName = require("./getPityAndBannerName");
const rateUp = require("./rateUp");
const pullResult = require("./pullResult");

// Constants
const { CEvent5, CEvent4 } = require("../DropRates.json");
const SOFTPITY5 = 73;
const SOFTPITY4 = 8;

module.exports = async (userId, userName) => {
  pitySchema.findOne({ UserID: userId }, async (err, pData) => {
    if (err) throw err;

    if (!pData) pData = newPityUser(userId, userName);

    bannerSchema.findOne({ UserID: userId }, async (err, bData) => {
      if (err) throw err;

      if (!bData) {
        bData = {
          UserID: userId,
          UserName: userName,
          selectedBanner: 5,
          selectedBannerName: "Wanderlust Invocation",
        };
      }

      // Take into account the novice banner later
      const pityAndBanner = getPityAndBannerName(pData, bData);
      let cur5Pity = pityAndBanner[0];
      let cur4Pity = pityAndBanner[1];
      let banner5Name = pityAndBanner[2];
      let banner4Name = pityAndBanner[3];

      const roll = Math.random();
      let dropRate5 =
        CEvent5 + Math.max(0, (cur5Pity - SOFTPITY5) * 10 * CEvent5);
      let dropRate4 =
        CEvent4 + Math.max(0, (cur4Pity - SOFTPITY4) * 10 * CEvent4);

      let wishResult;

      // have a 0.6% probability of getting the 5 star
      if (roll < dropRate5) {
        if (bData.selectedBanner == 5) {
          const getCharacter = Math.round(Math.random());
          wishResult = pullResult(
            getCharacter
              ? GenChar(5, [rateUp(bData.selectedBanner)[1], []])
              : GenWeapon(5, [rateUp(bData.selectedBanner)[0], []]),
            5,
            (char = getCharacter)
          );
        } else {
          const getEventChar =
            bData.selectedBanner == 0 || bData.selectedBanner == 1;
          wishResult = pullResult(
            getEventChar
              ? GenChar(5, rateUp(bData.selectedBanner))
              : GenWeapon(5, rateUp(bData.selectedBanner)),
            5,
            (char = getEventChar)
          );
        }
        resetFivePity(userId, banner5Name, banner4Name); // reset 5-star pity to 1 and increase 4-star pity
      }

      // probability of getting 4 star weapon (taking into account the marginal 5* drop rate)
      else if (roll < dropRate4 + dropRate5) {
        const getEventChar =
          bData.selectedBanner == 0 || bData.selectedBanner == 1;

        const res = pullResult(
          getEventChar
            ? GenChar(4, rateUp(bData.selectedBanner))
            : GenWeapon(4, rateUp(bData.selectedBanner)),
          4,
          (char = getEventChar ? true : false)
        );

        wishResult = res;

        resetFourPity(userId, banner5Name, banner4Name); // reset 4-star pity to 1 and increase 5-star pity
      } else {
        wishResult = pullResult(GenWeapon(3), 3, (char = false));
        updateBothPity(userId, banner5Name, banner4Name); // increment 4-star and 5-star pity
      }
      updateWishResult(userId, wishResult);
    });
  });
};
