module.exports = (rarity) => {
  const res = [];
  for (let i = 0; i < rarity; i++) res.push("⭐");
  return res.join("");
};
