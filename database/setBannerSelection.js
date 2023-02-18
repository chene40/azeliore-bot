const bannerSchema = require("./Schemas.js/banner");

// set the banner to the user inputted choice
module.exports = (userId, newBanner, bannerName) =>
  bannerSchema.updateOne(
    { UserID: userId },
      {
        $set: {
          selectedBanner: newBanner,
          selectedBannerName: bannerName,
        },
      },
      async (err, data) => {
        if (err) throw err;
      }
  );
