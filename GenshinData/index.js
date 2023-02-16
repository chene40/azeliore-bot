const battlePassWeapons = [
  "the-black-sword",
  "serpent-spine",
  "solar-pearl",
  "the-viridescent-hunt",
  "deathmatch",
];

const craftableWeapons = [
  "whiteblind",
  "crescent-pike",
  "prototype-rancour",
  "compound-bow",
  "mappa-mare",
  "prototype-archaic",
  "iron-sting",
  "snow-tombed-starsilver",
  "dragonspine-spear",
  "frostbearer",
  "prototype-starglitter",
  "prototype-crescent",
  "hakushin-ring",
  "amenoma-kageuchi",
  "kitain-cross-spear",
  "katsuragikiri-nagamasa",
  "hamayumi",
  // sumeru weapons
  "sapwood-blade",
  "fruit-of-fulfillment",
  "king-s-squire",
  "frost-regalia",
  "moonpiercer",
];

const excludedWeapons = battlePassWeapons.concat(craftableWeapons);

module.exports = { battlePassWeapons, craftableWeapons, excludedWeapons };
