const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  profit: Number
}, { timestamps: true });

module.exports = mongoose.model("Purchase", PurchaseSchema);
