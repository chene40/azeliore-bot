const { CEvent5, CEvent4 } = require("../DropRates.json");

const pitySchema = require("../database/Schemas.js/pity");
const bannerSchema = require("../database/Schemas.js/banner");
const wishingSchema = require("../database/Schemas.js/wishing");

const GenChar = require("./GenerateCharacter");
const GenWeapon = require("./GenerateWeapon");

const CurrentBanners = require("../CurrentBanners.json");
const currentBannerKeys = Object.keys(CurrentBanners);

const event5RateUp1 = [CurrentBanners[currentBannerKeys[0]].Star5];
const event5RateUp2 = [CurrentBanners[currentBannerKeys[1]].Star5];
const event4RateUp = CurrentBanners[currentBannerKeys[0]].Star4;
const weapon5RateUp = CurrentBanners[currentBannerKeys[2]].Star5;
const weapon4RateUp = CurrentBanners[currentBannerKeys[2]].Star4;
const perm5RateUpW = CurrentBanners[currentBannerKeys[4]].Star5W;
const perm5RateUpC = CurrentBanners[currentBannerKeys[4]].Star5C;

const SOFTPITY5 = 73;
const SOFTPITY4 = 8;

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

// can be refactored using array.reduce() eventually once noelle banner gets implemented
const rateUp = (selectedBanner) => {
  if (selectedBanner === 1) return [event5RateUp1, event4RateUp];
  else if (selectedBanner === 2) return [event5RateUp2, event4RateUp];
  else if (selectedBanner === 3) return [weapon5RateUp, weapon4RateUp];
  else if (selectedBanner === 5) return [perm5RateUpW, perm5RateUpC];
};

module.exports = async (userId, userName) => {
  pitySchema.findOne({ UserID: userId }, async (err, pData) => {
    if (err) throw err;

    if (!pData) {
      pData = {
        UserID: message.author.id,
        UserName: userName,
        EventBanner5: 1,
        EventBanner4: 1,
        EventBanner4Uprate: false,
        WeaponBanner5: 1,
        WeaponBanner4: 1,
        WeaponBanner4Uprate: false,
        Beginner5: 1,
        Beginner4: 1,
        BeginnerAvailable: true,
        Permanent5: 1,
      };
      pitySchema.create(pData);
    }

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
      let cur5Pity, cur4Pity;
      let banner5Name, banner4Name;

      if (bData.selectedBanner == 1 || bData.selectedBanner == 2) {
        cur5Pity = pData.EventBanner5;
        cur4Pity = pData.EventBanner4;
        banner5Name = "EventBanner5";
        banner4Name = "EventBanner4";
      } else if (bData.selectedBanner == 3) {
        cur5Pity = pData.WeaponBanner5;
        cur4Pity = pData.WeaponBanner4;
        banner5Name = "WeaponBanner5";
        banner4Name = "WeaponBanner4";
      } else if (bData.selectedBanner == 4 && pData.BeginnerAvailable) {
        cur5Pity = pData.Beginner5;
        cur4Pity = pData.Beginner4;
        banner5Name = "Beginner5";
        banner4Name = "Beginner4";
      } else {
        cur5Pity = pData.Permanent5;
        cur4Pity = pData.Permanent4;
        banner5Name = "Permanent5";
        banner4Name = "Permanent4";
      }

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

        // need to modify - reset 5-star pity to 1 and increase 4-star pity
        pitySchema.updateOne(
          { UserID: userId },
          {
            $set: { [banner5Name]: 1 },
            $inc: { [banner4Name]: 1 },
          },
          async (err, data) => {
            if (err) throw err;
          }
        );
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

        // need to modify - reset 4-star pity to 1 and increase 4-star pity
        pitySchema.updateOne(
          { UserID: userId },
          {
            $set: { [banner4Name]: 1 },
            $inc: { [banner5Name]: 1 },
          },
          async (err, data) => {
            if (err) throw err;
          }
        );
      } else {
        wishResult = pullResult(GenWeapon(3), 3, (char = false));

        // need to modify - increment 4-star and 5-star pity
        pitySchema.updateOne(
          { UserID: userId },
          {
            $inc: { [banner5Name]: 1, [banner4Name]: 1 },
          },
          async (err, data) => {
            if (err) throw err;
          }
        );
      }

      wishingSchema.updateOne(
        { UserID: userId },
        { $push: { wishingResult: wishResult } },
        async (err, data) => {
          if (err) throw err;
        }
      );
    });
  });
};
