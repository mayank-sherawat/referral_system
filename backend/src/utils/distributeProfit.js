const User = require("../models/User.model");

module.exports = async (buyerId, profit) => {
  const buyer = await User.findById(buyerId).populate("referredBy");

  if (!buyer?.referredBy) return;

  const parent = buyer.referredBy;
  const level1 = profit * 0.05;

  parent.earnings.direct += level1;
  parent.earnings.total += level1;
  await parent.save();

  if (parent.referredBy) {
    const level2User = await User.findById(parent.referredBy);
    const level2 = profit * 0.01;

    level2User.earnings.indirect += level2;
    level2User.earnings.total += level2;
    await level2User.save();
  }
};
