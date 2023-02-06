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

const pitySchema = require("../database/Schemas.js/pity");
const bannerSchema = require("../database/Schemas.js/banner");
const wishingSchema = require("../database/Schemas.js/wishing");

const GenChar = require("./GenerateCharacter");
const GenWeapon = require("./GenerateWeapon");

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

      if (bData.selectedBanner == 1 || bData.selectedBanner == 2) {
        cur5Pity = pData.EventBanner5;
        cur4Pity = pData.EventBanner4;
      } else if (bData.selectedBanner == 3) {
        cur5Pity = pData.WeaponBanner5;
        cur4Pity = pData.WeaponBanner4;
      } else if (bData.selectedBanner == 4 && pData.BeginnerAvailable) {
        cur5Pity = pData.Beginner5;
        cur4Pity = pData.Beginner4;
      } else {
        cur5Pity = pData.Permanent5;
        cur4Pity = pData.Permanent4;
      }

      const roll = Math.random();
      let dropRate5 =
        CEvent5 + Math.max(0, (cur5Pity - SOFTPITY5) * 10 * CEvent5);
      let dropRate4 =
        CEvent4 + Math.max(0, (cur4Pity - SOFTPITY4) * 10 * CEvent4);

      let wishResult;

      // have a 0.6% probability of getting the 5 star
      if (roll < dropRate5) {
        wishResult = pullResult(GenChar(5), 5, (char = true));

        // need to modify - reset 5-star pity to 1 and increase 4-star pity
        pitySchema.updateOne(
          { UserID: userId },
          {
            $set: { EventBanner5: 1 },
            $inc: { EventBanner4: 1 },
          },
          async (err, data) => {
            if (err) throw err;
          }
        );
      }

      // probability of getting 4 star weapon (taking into account the marginal 5* drop rate)
      else if (roll < dropRate4 + dropRate5) {
        const getChar = Math.round(Math.random());

        const res = pullResult(
          getChar ? GenChar(4) : GenWeapon(4),
          4,
          (char = getChar ? true : false)
        );

        wishResult = res;

        // need to modify - reset 4-star pity to 1 and increase 4-star pity
        pitySchema.updateOne(
          { UserID: userId },
          {
            $set: { EventBanner4: 1 },
            $inc: { EventBanner5: 1 },
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
            $inc: { EventBanner5: 1, EventBanner4: 1 },
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
