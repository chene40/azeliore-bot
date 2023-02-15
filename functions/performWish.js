// Database Schemas
const pitySchema = require("../database/Schemas.js/pity");
const bannerSchema = require("../database/Schemas.js/banner");

// Database Document Creation
const newPityUser = require("../database/Templates.js/newUserPity");

// Database Updates
const {
  updateWishResult,
  updateBothPity,
  resetFourPity,
  resetFivePity,
  resetFates,
  updateLostFate5050,
  increaseFatePoint,
  setUpratedFate,
  setEB4Uprate,
  setWB4Uprate,
} = require("../database/UpdatePulls.js");

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
const SOFTPITY5W = 63;

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
          selectedBanner: 4,
          selectedBannerName: "Wanderlust Invocation",
        };
      }

      const curBanner = bData.selectedBanner;

      // Take into account the novice banner later
      const pityAndBanner = getPityAndBannerName(pData, bData);
      const cur5Pity = pityAndBanner[0];
      const cur4Pity = pityAndBanner[1];
      const banner5Name = pityAndBanner[2];
      const banner4Name = pityAndBanner[3];

      const roll = Math.random();

      const dropRate5 =
        curBanner == 3
          ? CEvent5 + Math.max(0, (cur5Pity - SOFTPITY5W) * 10 * CEvent5)
          : CEvent5 + Math.max(0, (cur5Pity - SOFTPITY5) * 10 * CEvent5);
      const dropRate4 =
        CEvent4 + Math.max(0, (cur4Pity - SOFTPITY4) * 10 * CEvent4);

      let wishResult;

      // have a 0.6% probability of getting the 5 star
      if (roll < dropRate5) {
        // standard banner
        if (curBanner == 4) {
          const getCharacter = Math.round(Math.random());
          wishResult = pullResult(
            getCharacter
              ? GenChar(5, [rateUp(curBanner)[1], []])
              : GenWeapon(5, [rateUp(curBanner)[0], []]),
            5,
            (char = getCharacter)
          );
        }

        // weapon banner
        else if (curBanner == 3) {
          const { Uprated, Selected, Fates, WeaponName } = pData.FateSelection;
          const getUprated = Math.random() >= 0.25 || Uprated; // if we get uprated weapon or not
          const guaranteed = Selected && Fates == 2;

          let newWeapon;

          if (getUprated || guaranteed) {
            if (guaranteed) {
              newWeapon = GenWeapon(5, [[WeaponName], []]);
              wishResult = pullResult(newWeapon, 5, (char = false));
              resetFates(userId);
            } else {
              newWeapon = GenWeapon(5, rateUp(curBanner));
              wishResult = pullResult(newWeapon, 5, (char = false));

              if (Selected) {
                const resName = wishResult.apiData.name
                  .toLowerCase()
                  .replace(/ /g, "-");
                if (resName === WeaponName) resetFates(userId);
                else updateLostFate5050(userId);
              }
            }
          } else {
            newWeapon = GenWeapon(5, rateUp(4));
            wishResult = pullResult(newWeapon, 5, (char = false));
            if (Selected) increaseFatePoint(userId);
            if (!Uprated) setUpratedFate(userId);
          }
        }

        // event banner
        else {
          const getUprate = Math.round(Math.random());
          const guaranteed = pData.EventBanner5Uprate;
          const getEventChar = guaranteed || getUprate;

          let newChar;
          if (getEventChar) newChar = GenChar(5, rateUp(curBanner));
          else newChar = GenChar(5, [rateUp(4)[1], []]);

          wishResult = pullResult(newChar, 5, (char = true));

          if (getEventChar) setEB4Uprate(userId, false);
          else setEB4Uprate(userId, true);
        }
        resetFivePity(userId, banner5Name, banner4Name); // reset 5-star pity to 1 and increase 4-star pity
      }

      // probability of getting 4 star (taking into account the marginal 5* drop rate)
      else if (roll < dropRate4 + dropRate5) {
        // standard banner
        if (curBanner === 5) {
          const getCharacter = Math.round(Math.random());
          wishResult = pullResult(
            getCharacter
              ? GenChar(4, [rateUp(curBanner)[1], []])
              : GenWeapon(4, [rateUp(curBanner)[0], []]),
            5,
            (char = getCharacter)
          );
        }

        // weapon banner
        else if (curBanner === 3) {
          const getUprate = Math.random() >= 0.25;
          const guaranteed = pData.WeaponBanner4Uprate;
          const getEventWeapon = guaranteed || getUprate;

          let res, isPullWeapon;

          if (!getEventWeapon) {
            isPullWeapon = Math.round(Math.random());
            if (isPullWeapon) res = GenWeapon(4, rateUp(6));
            else res = GenChar(4, rateUp(5));
          }
          wishResult = pullResult(
            getEventWeapon ? GenWeapon(4, [[], rateUp(curBanner)[1]]) : res,
            4,
            (char = !(getEventWeapon || isPullWeapon))
          );
          if (getEventWeapon) setWB4Uprate(userId, false);
          else setWB4Uprate(userId, true);
        }
        // event banner
        else {
          const getUprate = Math.round(Math.random());
          const guaranteed = pData.EventBanner4Uprate;
          const getEventChar = guaranteed || getUprate;

          let res, isPullChar;

          if (!getEventChar) {
            isPullChar = Math.round(Math.random());
            if (isPullChar) res = GenChar(4, rateUp(5));
            else res = GenWeapon(4, rateUp(6));
          }

          wishResult = pullResult(
            getEventChar ? GenChar(4, [[], rateUp(curBanner)[1]]) : res,
            4,
            (char = getEventChar || isPullChar)
          );
          if (getEventChar) setEB4Uprate(userId, false);
          else setEB4Uprate(userId, true);
        }
        resetFourPity(userId, banner5Name, banner4Name); // reset 4-star pity to 1 and increase 5-star pity
      } else {
        wishResult = pullResult(GenWeapon(3), 3, (char = false));
        updateBothPity(userId, banner5Name, banner4Name); // increment 4-star and 5-star pity
      }
      updateWishResult(userId, wishResult);
    });
  });
};
