const Purchase = require("../models/Purchase.model");
const distributeProfit = require("../utils/distributeProfit");

exports.makePurchase = async (req, res) => {
  const { amount } = req.body;

  if (amount < 1000)
    return res.json({ message: "Purchase successful" });

  const profit = amount

  await Purchase.create({
    userId: req.userId,
    amount,
    profit
  });

  await distributeProfit(req.userId, profit);

  res.json({ message: "Purchase successful" });
};
