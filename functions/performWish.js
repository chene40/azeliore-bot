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
        bData.selectedBanner == 3
          ? CEvent5 + Math.max(0, (cur5Pity - SOFTPITY5W) * 10 * CEvent5)
          : CEvent5 + Math.max(0, (cur5Pity - SOFTPITY5) * 10 * CEvent5);
      let dropRate4 =
        CEvent4 + Math.max(0, (cur4Pity - SOFTPITY4) * 10 * CEvent4);

      let wishResult;

      // have a 0.6% probability of getting the 5 star
      if (roll < dropRate5) {
        // standard banner
        if (bData.selectedBanner == 5) {
          const getCharacter = Math.round(Math.random());
          wishResult = pullResult(
            getCharacter
              ? GenChar(5, [rateUp(bData.selectedBanner)[1], []])
              : GenWeapon(5, [rateUp(bData.selectedBanner)[0], []]),
            5,
            (char = getCharacter)
          );
        }

        // weapon banner
        else if (bData.selectedBanner == 3) {
          const getUprated =
            Math.random() >= 0.25 || pData.FateSelection.Uprated; // if we get uprated weapon or not

          const guaranteed =
            pData.FateSelection.Selected && pData.FateSelection.Fates == 2;

          if (getUprated || guaranteed) {
            if (guaranteed) {
              wishResult = pullResult(
                GenWeapon(5, [[pData.FateSelection.WeaponName], []]),
                5,
                (char = false)
              );

              pitySchema.updateOne(
                { UserID: userId },
                {
                  $set: {
                    "FateSelection.Fates": 0,
                    "FateSelection.Uprated": false,
                  },
                },
                async (err, data) => {
                  if (err) throw err;
                }
              );
            } else {
              wishResult = pullResult(
                GenWeapon(5, rateUp(bData.selectedBanner)),
                5,
                (char = false)
              );

              if (pData.FateSelection.Selected) {
                const resName = wishResult.apiData.name
                  .toLowerCase()
                  .replace(/ /g, "-");
                if (resName === pData.FateSelection.WeaponName) {
                  pitySchema.updateOne(
                    { UserID: userId },
                    {
                      $set: {
                        "FateSelection.Fates": 0,
                        "FateSelection.Uprated": false,
                      },
                    },
                    async (err, data) => {
                      if (err) throw err;
                    }
                  );
                } else {
                  pitySchema.updateOne(
                    { UserID: userId },
                    {
                      $set: {
                        "FateSelection.Uprated": false,
                      },
                      $inc: { "FateSelection.Fates": 1 },
                    },
                    async (err, data) => {
                      if (err) throw err;
                    }
                  );
                }
              }
            }
          } else {
            wishResult = pullResult(GenWeapon(5, rateUp(5)), 5, (char = false));

            if (pData.FateSelection.Selected) {
              pitySchema.updateOne(
                { UserID: userId },
                {
                  $inc: { "FateSelection.Fates": 1 },
                },
                async (err, data) => {
                  if (err) throw err;
                }
              );
            }

            if (!pData.FateSelection.Uprated) {
              pitySchema.updateOne(
                { UserID: userId },
                {
                  $set: { "FateSelection.Uprated": true },
                },
                async (err, data) => {
                  if (err) throw err;
                }
              );
            }
          }
        }

        // noelle banner
        else if (bData.selectedBanner == 4) {
        }

        // event banner
        else {
          const getUprate = Math.round(Math.random());
          const guaranteed = pData.EventBanner5Uprate;
          const getEventChar = guaranteed || getUprate;

          wishResult = pullResult(
            getEventChar
              ? GenChar(5, rateUp(bData.selectedBanner))
              : GenChar(5, [rateUp(5)[1], []]),
            5,
            (char = true)
          );

          if (getEventChar) {
            pitySchema.updateOne(
              { UserID: userId },
              { $set: { EventBanner5Uprate: false } },
              async (err, data) => {
                if (err) throw err;
              }
            );
          } else {
            pitySchema.updateOne(
              { UserID: userId },
              { $set: { EventBanner5Uprate: true } },
              async (err, data) => {
                if (err) throw err;
              }
            );
          }
        }
        resetFivePity(userId, banner5Name, banner4Name); // reset 5-star pity to 1 and increase 4-star pity
      }

      // probability of getting 4 star (taking into account the marginal 5* drop rate)
      else if (roll < dropRate4 + dropRate5) {
        // standard banner
        if (bData.selectedBanner == 5) {
          const getCharacter = Math.round(Math.random());
          wishResult = pullResult(
            getCharacter
              ? GenChar(4, [rateUp(bData.selectedBanner)[1], []])
              : GenWeapon(4, [rateUp(bData.selectedBanner)[0], []]),
            5,
            (char = getCharacter)
          );
        }

        // weapon banner
        else if (bData.selectedBanner == 3) {
          const getUprate = Math.random() >= 0.25;
          const guaranteed = pData.WeaponBanner4Uprate;
          const getEventWeapon = guaranteed || getUprate;

          let res, isPullWeapon;

          if (!getEventWeapon) {
            isPullWeapon = Math.round(Math.random());
            if (isPullWeapon) res = GenWeapon(4, rateUp(7));
            else res = GenChar(4, rateUp(6));
          }

          wishResult = pullResult(
            getEventWeapon
              ? GenWeapon(4, [[], rateUp(bData.selectedBanner)[1]])
              : res,
            4,
            (char = !(getEventWeapon || isPullWeapon))
          );
          if (getEventWeapon) {
            pitySchema.updateOne(
              { UserID: userId },
              { $set: { WeaponBanner4Uprate: false } },
              async (err, data) => {
                if (err) throw err;
              }
            );
          } else {
            pitySchema.updateOne(
              { UserID: userId },
              { $set: { WeaponBanner4Uprate: true } },
              async (err, data) => {
                if (err) throw err;
              }
            );
          }
        }

        // noelle banner
        else if (bData.selectedBanner == 4) {
        }

        // event banner
        else {
          const getUprate = Math.round(Math.random());
          const guaranteed = pData.EventBanner4Uprate;
          const getEventChar = guaranteed || getUprate;

          let res, isPullChar;

          if (!getEventChar) {
            isPullChar = Math.round(Math.random());
            if (isPullChar) res = GenChar(4, rateUp(6));
            else res = GenWeapon(4, rateUp(7));
          }

          wishResult = pullResult(
            getEventChar
              ? GenChar(4, [[], rateUp(bData.selectedBanner)[1]])
              : res,
            4,
            (char = getEventChar || isPullChar)
          );
          if (getEventChar) {
            pitySchema.updateOne(
              { UserID: userId },
              { $set: { EventBanner4Uprate: false } },
              async (err, data) => {
                if (err) throw err;
              }
            );
          } else {
            pitySchema.updateOne(
              { UserID: userId },
              { $set: { EventBanner4Uprate: true } },
              async (err, data) => {
                if (err) throw err;
              }
            );
          }
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
