const bannerSchema = require("../Schemas.js/banner");

module.exports = (userId, userName) => {
  data = {
    UserID: userId,
    UserName: userName,
    selectedBanner: 5,
    selectedBannerName: "Wanderlust Invocation",
  };
  bannerSchema.create(data);
  return data;
};
