const testSchema = require("../database/Schemas.js/test");

module.exports.run = async (client, message, args) => {
  testSchema.findOne(
    { GuildID: message.guildId, UserID: message.author.id },
    async (err, data) => {
      if (err) throw err;

      if (!data) {
        testSchema.create({
          GuildID: message.guildId,
          UserID: message.author.id,
          UserName: message.author.username,
        });
      }

      console.log(data);
    }
  );
};

exports.name = "dbtest";
