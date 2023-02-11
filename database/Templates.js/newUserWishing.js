const wishingSchema = require("../Schemas.js/wishing");

module.exports = (userId, userName) => {
  data = {
    UserID: userId,
    UserName: userName,
    wishingResult: [],
  };
  wishingSchema.create(data);
  return data;
};
