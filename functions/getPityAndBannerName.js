module.exports = (pData, bData) => {
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
  } else {
    cur5Pity = pData.Permanent5;
    cur4Pity = pData.Permanent4;
    banner5Name = "Permanent5";
    banner4Name = "Permanent4";
  }

  return [cur5Pity, cur4Pity, banner5Name, banner4Name];
};
