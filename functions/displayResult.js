module.exports = (message, wishingResult) => {
  message.channel.send({
    files: wishingResult,
    split: { files: "\u200b" },
  });
  return [];
};
