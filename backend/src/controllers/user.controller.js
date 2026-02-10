const User = require("../models/User.model");

exports.profile = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({
    userId: user.userNumber,
    name: user.name,
    email: user.email,
    referralCode: user.referralCode,
    totalEarnings: user.earnings.total
  });
};

exports.earnings = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.earnings);
};

exports.referrals = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({
    used: user.directReferrals.length,
    available: 8 - user.directReferrals.length
  });
};
