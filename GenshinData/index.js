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

const paimonsBargins = [
  "royal-bow",
  "royal-grimoire",
  "royal-spear",
  "royal-greatsword",
  "royal-longsword",
  "blackcliff-amulet",
  "blackcliff-pole",
  "blackcliff-warbow",
  "blackcliff-longsword",
  "blackcliff-slasher",
];

const eventWeapons = [
  "festering-desire",
  "luxurious-sea-lord",
  "cinnabar-spindle",
  "toukabou-shigure",
  "fading-twilight",
  "missive-windspear",
  "dodoco-tales",
  "windblume-ode",
];

const excludedWeapons = battlePassWeapons
  .concat(craftableWeapons)
  .concat(paimonsBargins)
  .concat(eventWeapons);

module.exports = {
  battlePassWeapons,
  craftableWeapons,
  paimonsBargins,
  eventWeapons,
  excludedWeapons,
};
